import { Button, Select, Stack, TextInput, Group } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect } from 'react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { fireDb } from '../firebaseConfig'
import { showNotification } from '@mantine/notifications';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import moment from 'moment'

function TransactionForm({ formMode, setFormMode, setShowForm, transactionData, getData }) {
  const dispatch = useDispatch();
  // getting current user
  const user = JSON.parse(localStorage.getItem("user"));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading())
      if (formMode === "add") {
        await addDoc(
          collection(
            fireDb,
            `users/${user.id}/transactions`, // transactions -> sub collection in user collection
          ),
          transactionForm.values
        );
      } else {
        setDoc(
          doc(fireDb, `users/${user.id}/transactions`, transactionData.id),
          transactionForm.values
        );
      }

      getData();

      showNotification({
        title: formMode === "add" ? "Transaction added" :"Transaction updated",
        color: "green"
      })
      dispatch(HideLoading())
      setShowForm(false);
    } catch (error) {
      console.log(error)
      showNotification({
        title: formMode === "add" ? "Error adding transaction" : "Error updating transaction",
        color: "red"
      })
      dispatch(HideLoading())
    }
  }

  useEffect(() => {
    if (formMode === "edit") {
      transactionForm.setValues(transactionData);
      // converting date format to populate into modal
      transactionForm.setFieldValue("date", moment(transactionData.date, 'YYYY-MM-DD').format("YYYY-MM-DD"));
    }
  }, [transactionData]);
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
              type="date"
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

          <Button color='cyan' type='submit'>
            {formMode === "add" ? "Add Transaction" : "Update Transaction"}
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export default TransactionForm
