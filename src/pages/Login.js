import React from 'react'
import { useForm } from '@mantine/form'
import { Anchor, Button, Card, Divider, Stack, TextInput, Title } from '@mantine/core'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { fireDb } from '../firebaseConfig'

function Login() {
  const loginForm = useForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
  })

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const qry = query(
        collection(fireDb, "users"), 
        where("email", "==", loginForm.values.email),
        where("password", "==", loginForm.values.password) 
      );
      const existingUsers = await getDocs(qry);
      if(existingUsers.size > 0) {
        alert("User logged in successfully")
      } else {
        alert("User not found")
      }
    } catch (error) {
      alert("Something went wrong")
    }
  }
  return (
    <div className='flex h-screen justify-center items-center'>
      <Card sx={{
        width: 400,
        padding:'sm'
      }}
       shadow='lg'
       withBorder
      >
        <Title order={2} mb={5}>Login</Title>
        <Divider variant='dotted' color='gray'/>
        <form action='' onSubmit={handleSubmit}>
          <Stack mt={5}>
            <TextInput label="Email" placeholder='Enter your email' name='email'
              {...loginForm.getInputProps("email")}
            />
            <TextInput label="Password" placeholder='Enter your password' name='password'
              {...loginForm.getInputProps("password")}
            />
            <Button type='submit' color='violet'>Login</Button>
            <Anchor href='/register' target="_self">
              Don't have an account? Register
            </Anchor>
          </Stack>
        </form>
      </Card>
    </div>
  )
}

export default Login

