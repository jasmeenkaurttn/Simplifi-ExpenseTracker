import { Box, Button, Card, Modal } from '@mantine/core'
import React, { useState } from 'react'
import Header from '../components/Header'
import TransactionForm from '../components/TransactionForm';

function Home() {
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  return (
    <Box>
      <Header />
      <Card>
        <div className='flex justify-between'>
          <div>
            Filters
          </div>
          <div>
            <Button 
              color='cyan'
              onClick={() => {
                setShowForm(true);
                setFormMode("add");
              }}
            >
              Add Transaction
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        size='lg'
        title={formMode === "add" ? "Add Transaction" : "Edit Transaction"}
        opened={showForm}
        onClose={() => {
          setShowForm(false);
        }}
        centered
      >
        <TransactionForm 
          formMode={formMode}
          setFormMode={setFormMode}
          setShowForm={setShowForm}
          showForm={showForm}
        />
      </Modal>
    </Box>
  )
}

export default Home
