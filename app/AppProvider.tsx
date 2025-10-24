'use client'
import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  sessionToken: '',
  setSectionToken: (sessionToken: string) => { }
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("Errors!")
  }
  return context
}


export default function AppProvider({ children, initialSessionToken = '' }:
  { children: React.ReactNode, initialSessionToken: string }) {
  const [sessionToken, setSectionToken] = useState(initialSessionToken)

  return (
    <AppContext.Provider value={{ sessionToken, setSectionToken }}>
      {children}
    </AppContext.Provider>
  )
}