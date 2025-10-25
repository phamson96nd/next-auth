import http from "@/lib/http";
import { LoginBodyType, LoginResType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/api/auth', body, {
    baseUrl: ''
  })
}

export default authApiRequest