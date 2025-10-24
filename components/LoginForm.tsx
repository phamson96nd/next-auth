"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import envConfig from "@/app/config"
import { toast } from "sonner"
import { useAppContext } from "@/app/AppProvider"

export default function LoginForm() {
  const { setSectionToken } = useAppContext()

  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload
        }
        if (!res.ok) {
          throw data
        }
        return data
      })

      toast("", {
        description: result.payload.message
      })
      
      const resultFromNextServer = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload
        }
        if (!res.ok) {
          throw data
        }
        return data
      })
      setSectionToken(resultFromNextServer.payload.data.token)

    } catch (errors: any) {
      const error = errors.payload.errors as { field: string, message: string }[]
      const status = errors.status as number
      if (status === 422) {
        error.forEach((item) => {
          form.setError(item.field as 'email' | 'password', {
            type: 'server',
            message: item.message
          })
        })
      } else {
        toast("Errors", {
          description: errors.payload.message
        })
      }
    }


  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[800px]">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (

            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (

            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

