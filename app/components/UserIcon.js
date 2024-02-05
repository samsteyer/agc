import { useSession, signOut } from "next-auth/react"
import styles from './UserIcon.module.css';

export default function UserIcon() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <img src={session.user.image} alt={session.user.name} />
        <p>{session.user.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>{AGC}</p>
        <button onClick={() => SignIn()}>Sign in</button>
      </div>
    )
  }

  return null
}
