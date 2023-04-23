import { Box, Button, Card, Modal } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TransactionForm from '../components/TransactionForm';
import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { fireDb } from '../firebaseConfig'
import { showNotification } from '@mantine/notifications';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../redux/alertsSlice';
import TransactionTable from '../components/TransactionTable';
import Filters from '../components/Filters';
import moment from 'moment';

function Home() {
  const [filters, setFilters] = useState({
    type: "",
    frequency: "7",
    dateRange: []
  });
  const user = JSON.parse(localStorage.getItem("user"))
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedTransaction, setSelectedTransaction] = useState([]);

  const getWhereConditions = () => {
    const tempConditions = [];
    // query for filtering transactions - type
    if(filters.type !== "") {
      tempConditions.push(where("type", "==", filters.type))
    } 
    // frequency condition
    if(filters.frequency !== "custom-range"){
      if(filters.frequency === "7") {
        tempConditions.push(
          where("date", ">=", moment().subtract(7, "days").format("YYYY-MM-DD"))
        )
      } else if(filters.frequency === "30"){
        tempConditions.push(
          where("date", ">=", moment().subtract(30, "days").format("YYYY-MM-DD"))
        )
      } else if(filters.frequency === "365"){
        tempConditions.push(
          where("date", ">=", moment().subtract(365, "days").format("YYYY-MM-DD"))
        )
      } 
    } else {   // custom range date filter
      const fromDate = moment(filters.dateRange[0]).format("YYYY-MM-DD");
      const toDate = moment(filters.dateRange[1]).format("YYYY-MM-DD");
      tempConditions.push(where("date", ">=", fromDate));
      tempConditions.push(where("date", "<=", toDate));
    }
    return tempConditions;
  }
  const getData = async () => {
    try {
      const whereConditions = getWhereConditions();
      dispatch(ShowLoading())
      const qry = query(collection(fireDb, `users/${user.id}/transactions`),
        orderBy("date", "desc"),
        ...whereConditions
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
  }, [filters]);
  return (
    <Box>
      <Header />
      <div className='container'>
        <Card>
          <div className='flex justify-between'>
            <div>
              <Filters
                filters={filters}
                setFilters={setFilters}
                getData={getData}
              />
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
            getData={getData}
          />
        </Card>
      </div>

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
