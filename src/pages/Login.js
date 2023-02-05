import React from 'react'
import { useForm } from '@mantine/form'
import { Anchor, Button, Card, Divider, Stack, TextInput, Title } from '@mantine/core'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { fireDb } from '../firebaseConfig'
import CryptoJS from 'crypto-js'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../redux/alertsSlice'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      dispatch(ShowLoading());
      const qry = query(
        collection(fireDb, "users"), 
        where("email", "==", loginForm.values.email),
      );
      const existingUsers = await getDocs(qry);
      if(existingUsers.size > 0) {
        // decrypt password
        const decryptedPassword = CryptoJS.AES.decrypt(
          existingUsers.docs[0].data().password,
          "expense-tracker"
        ).toString(CryptoJS.enc.Utf8)
        if(decryptedPassword === loginForm.values.password){
          showNotification({
            title: 'Login Successful',
            color: 'green',
          })
          const datatoPutInLocalStorage = {
            name: existingUsers.docs[0].data().name,
            email: existingUsers.docs[0].data().email,
            id: existingUsers.docs[0].id,
          }
          localStorage.setItem("user", JSON.stringify(datatoPutInLocalStorage))
          navigate("/");
        } else {
          showNotification({
            title: 'Invalid credentials',
            color: 'red',
          })
        }
      } else {
        showNotification({
          title: 'User does not exist',
          color: 'red',
        })
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading())
      showNotification({
        title: 'Something went wrong',
        color: 'red',
      })
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
            <TextInput 
              label="Email" 
              placeholder='Enter your email' 
              name='email'
              {...loginForm.getInputProps("email")}
            />
            <TextInput 
              label="Password" 
              placeholder='Enter your password' 
              name='password'
              type='password'
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

