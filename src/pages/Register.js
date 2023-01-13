import React from 'react'
import { useForm } from '@mantine/form'
import { Button, Card, Divider, Stack, TextInput, Title, Anchor } from '@mantine/core'
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { fireDb } from '../firebaseConfig'

function Register() {
  const registerForm = useForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //Checking if user already exists based on email

      const qry = query(
        collection(fireDb, "users"), // getDocs -> used for getting all documents in a collections
        where("email", "==", registerForm.values.email) //where -> specify the condition
      );
      const existingUsers = await getDocs(qry);

      if (existingUsers.size > 0) {
        alert("User already exists");
        return;
      } else {
        const response = await addDoc(collection(fireDb, "users"), registerForm.values)
        if (response.id) {
          alert("User created successfully")
        } else {
          alert("User creation failed")
        }
      }

    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }
  }
  return (
    <div className='flex h-screen justify-center items-center'>
      <Card sx={{
        width: 400,
        padding: 'sm'
      }}
        shadow='lg'
        withBorder
      >
        <Title order={2} mb={5}>Register</Title>
        <Divider variant='dotted' color='gray' />
        <form action='' onSubmit={handleSubmit}>
          <Stack mt={5}>
            <TextInput label="Name" placeholder='Enter your name' name='name'
              {...registerForm.getInputProps("name")}
            />
            <TextInput label="Email" placeholder='Enter your email' name='email'
              {...registerForm.getInputProps("email")}
            />
            <TextInput label="Password" placeholder='Enter your password' name='password'
              {...registerForm.getInputProps("password")}
            />
            <Button type='submit' color='violet'>Register</Button>
            <Anchor href='/login' target="_self">
              Already have an account? Login
            </Anchor>
          </Stack>
        </form>
      </Card>
    </div>
  )
}

export default Register
