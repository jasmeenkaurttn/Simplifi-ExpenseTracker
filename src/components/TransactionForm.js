import { Button, Select, Stack, TextInput, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

function TransactionForm() {
  const transactionForm = useForm({
    initialValues: {
      name: '',
      type: '',
      amount: '',
      date: '',
      category: '',
      reference: '',
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(transactionForm.values);
  }
  return (
    <div>
      {/* use stack for equal spacing */}
      <form action='' onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            name='name'
            label='Name'
            placeholder='Enter Transaction Name'
            {...transactionForm.getInputProps("name")}
          />
          <Group grow>
            <Select
              name='type'
              label="Type"
              placeholder="Select Transaction Type"
              data={[
                { value: 'income', label: 'Income' },
                { value: 'expense', label: 'Expense' },
              ]}
              {...transactionForm.getInputProps("type")}
            />
            <Select
              name='category'
              label="Category"
              placeholder="Select Category Type"
              data={[
                { value: 'food', label: 'Income' },
                { value: 'transport', label: 'Transport' },
                { value: 'shopping', label: 'Shopping' },
                { value: 'entertainment', label: 'Entertainment' },
                { value: 'health', label: 'Health' },
                { value: 'education', label: 'Education' },
                { value: 'salary', label: 'Salary' },
                { value: 'rental-income', label: 'Rental Income' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'content-creator', label: 'Content Creator' },
                { value: 'business', label: 'Business' },
              ]}
              {...transactionForm.getInputProps("category")}
            />
          </Group>
          <Group grow>
            <TextInput
              name='amount'
              label='Amount'
              placeholder='Enter Transaction Amount'
              {...transactionForm.getInputProps("amount")}
            />
            <TextInput
              name='date'
              label='Date'
              placeholder='Enter Transaction Date'
              {...transactionForm.getInputProps("date")}
            />
          </Group>
          <TextInput
            name="reference"
            label="Reference"
            placeholder="Enter Transaction Reference"
            {...transactionForm.getInputProps("reference")}
          />

          <Button color='cyan' type='submit'>ADD</Button>
        </Stack>
      </form>
    </div>
  )
}

export default TransactionForm
