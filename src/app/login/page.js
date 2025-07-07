'use client'

import { useEffect, useState } from 'react'
import { signIn, useSession } from "next-auth/react"
import { TextField, Button, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (session) router.push('/')
  }, [session, router])

  const handleLogin = async (e) => {
    e.preventDefault()

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    })

    if (result.error) {
      alert(result.error)
    } else {
      window.location.href = "/"
    }
  }

  return (
    <div className=' container '>
      <div className="card " style={{ justifyContent: 'center', alignItems: 'center' ,width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <h1>Login</h1>
        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <Button fullWidth onClick={handleLogin} className='btn-primary' variant="contained" type="submit">
              Log In
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
