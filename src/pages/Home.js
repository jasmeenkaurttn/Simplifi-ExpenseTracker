import { Box, Button, Card, Modal } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TransactionForm from '../components/TransactionForm';
import {addDoc, collection, getDocs, orderBy, query} from 'firebase/firestore'
import {fireDb} from '../firebaseConfig'
import { showNotification } from '@mantine/notifications';
import { useDispatch } from 'react-redux';
import {ShowLoading, HideLoading } from '../redux/alertsSlice';
import TransactionTable from '../components/TransactionTable';

function Home() {
  const user = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedTransaction, setSelectedTransaction] = useState([]);
  
  const getData = async () => {
    try {
      dispatch(ShowLoading())
      const qry = query(collection(fireDb, `users/${user.id}/transactions`),
      orderBy("date", "desc")
      );
      const res = await getDocs(qry);
      const data = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))

      setTransactions(data)
      dispatch(HideLoading())
    } catch (error) {
      console.log(error)
      showNotification({
        title: "Error fetching transactions",
        color: "red"
      })
      dispatch(HideLoading())
    }
  }
  useEffect(() => {
    getData()
  },[])
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

        <TransactionTable 
          transactions={transactions} 
          setSelectedTransaction={setSelectedTransaction}
          setFormMode={setFormMode}
          setShowForm={setShowForm}
        />
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
          transactionData={selectedTransaction}
          getData={getData}
        />
      </Modal>
    </Box>
  )
}

export default Home
