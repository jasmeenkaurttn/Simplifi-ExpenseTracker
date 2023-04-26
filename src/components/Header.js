import { Card, Group, Text } from '@mantine/core'
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
          <Group className='flex items-center'>
            {user?.name}
            <Text className='flex items-center cursor-pointer'><i className="ri-logout-box-r-line"
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
            ></i><span className='cursor-pointer'>Logout</span></Text>
            {/* <Text size='sm' variant='text' color='teal'>
               Logout
            </Text> */}
          </Group>
        </div>
      </Card>
    </div>
  )
}

export default Header
