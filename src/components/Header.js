import { Card, Text } from '@mantine/core'
import React from 'react'

function Header() {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      <Card shadow='md' withBorder p={15}>
        <div className='flex justify-between'>
          <Text 
            size='xl' 
            color='teal' 
            variant='text'
            fw={700}
          >
            SIMPLIFI
          </Text>
          <Text>{user?.name}</Text>
        </div>
      </Card>
    </div>
  )
}

export default Header
