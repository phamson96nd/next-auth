import Link from 'next/link'

function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>

        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header