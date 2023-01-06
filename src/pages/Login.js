import React from 'react'
import { useForm } from '@mantine/form'
import { Anchor, Button, Card, Divider, Stack, TextInput, Title } from '@mantine/core'

function Login() {
  const loginForm = useForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(loginForm.values);
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

