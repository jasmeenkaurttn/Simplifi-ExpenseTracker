import { Card, Group, Space, Text, createStyles } from '@mantine/core'
import React from 'react'

const useStyles = createStyles((theme) => ({
  hover: {
    cursor: 'pointer',
  }
}));

function Header() {
  const user = JSON.parse(localStorage.getItem('user'))
  const { classes } = useStyles();

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
            <Text color='cyan' fw={600}>{user?.name}</Text>
            <Text className='flex items-center cursor-pointer' onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}>
              <i className="ri-logout-box-r-line"></i>
              <Space w="xs" />
              <span className={`${classes.hover}`}>Logout</span></Text>
          </Group>
        </div>
      </Card>
    </div>
  )
}

export default Header
