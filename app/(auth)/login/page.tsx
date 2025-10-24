import LoginForm from "@/components/LoginForm"

function LogIn() {
  return (
    <div>
      <h1 className="text-xl text-center">Login</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  )
}

export default LogIn