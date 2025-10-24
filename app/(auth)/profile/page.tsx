import envConfig from "@/app/config";
import { cookies } from 'next/headers'


export default async function Profile() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken?.value}`
      },
      method: 'GET'
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


  return (
    <div>
      <h1>Profile</h1>
      <div>{result.payload?.data?.name}</div>
    </div>
  )
}
