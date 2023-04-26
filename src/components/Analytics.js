import React from 'react'
import '../styles/analytics.css';
import { Divider, Group } from '@mantine/core';
import { RingProgress, Text, Progress } from '@mantine/core';

function Analytics({ transactions }) {
  const totalTransactions = transactions.length;

  //transactions count
  const totalIncomeTransactions = transactions.filter(transaction => transaction.type === "income").length
  const totalExpenseTransactions = transactions.filter(transaction => transaction.type === "expense").length
  const totalIncomeTransactionsPercentage = (totalIncomeTransactions / totalTransactions) * 100;
  const totalExpenseTransactionsPercentage = (totalExpenseTransactions / totalTransactions) * 100;

  //total amount
  const totalAmount = transactions.reduce((acc, transaction) => {
    return acc + Number(transaction.amount);
  }, 0);

  const totalIncomeAmount = transactions.filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amount);
    }, 0);

  const totalExpenseAmount = transactions.filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => {
      return acc + Number(transaction.amount);
    }, 0);

  const totalIncomeAmountPercentage = (totalIncomeAmount / totalAmount) * 100;
  const totalExpenseAmountPercentage = (totalExpenseAmount / totalAmount) * 100;


  const categories = [
    { value: 'food', label: 'Food' },
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
  ];

  return (
    <div>
      <Group mt={20}>
        <div className='total-transactions'>
          <h1 className='card-title'>Total Transactions: {totalTransactions} </h1>
          <Divider my={20} />
          <p>Income Transactions: {totalIncomeTransactions} </p>
          <p>Expense Transactions: {totalExpenseTransactions} </p>

          <Group>
            <RingProgress
              label={
                <Text size="xs" align="center">
                  Income {totalIncomeTransactionsPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalIncomeTransactionsPercentage },
                { value: totalIncomeTransactionsPercentage, color: 'teal' },
              ]}
            />

            <RingProgress
              label={
                <Text size="xs" align="center">
                  Expense {totalExpenseTransactionsPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalExpenseTransactionsPercentage },
                { value: totalExpenseTransactionsPercentage, color: 'red' },
              ]}
            />
          </Group>
        </div>

        <div className='total-turnover'>
          <h1 className='card-title'>Total Turnover: {totalAmount} </h1>
          <Divider my={20} />
          <p>Income: {totalIncomeAmount} </p>
          <p>Expense: {totalExpenseAmount} </p>

          <Group>
            <RingProgress
              label={
                <Text size="xs" align="center">
                  Income {totalIncomeAmountPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalIncomeAmountPercentage },
                { value: totalIncomeAmountPercentage, color: 'teal' },
              ]}
            />

            <RingProgress
              label={
                <Text size="xs" align="center">
                  Expense {totalExpenseAmountPercentage.toFixed(2)}%
                </Text>
              }
              roundCaps
              sections={[
                { value: 100 - totalExpenseAmountPercentage },
                { value: totalExpenseAmountPercentage, color: 'red' },
              ]}
            />
          </Group>
        </div>
      </Group>

      <Group mt={20} grow>
        <div className='income-categories'>
          <h1 className='card-title'>Income Categories</h1>
          <Divider my={20} />
          {categories.map((category) => {
            const incomeCategoryTransactionsAmount = transactions.filter((transaction) => transaction.type === "income" && transaction.category === category.value)
              .reduce((acc, transaction) => {
                return acc + Number(transaction.amount);
              }, 0);

              const incomeCategoryTransactionsPercentage = (incomeCategoryTransactionsAmount / totalIncomeAmount) * 100;
            return (
              <div>
                <p>{category.label}</p>
                <Progress 
                  size={20}
                  color='teal'
                  value={incomeCategoryTransactionsPercentage} 
                  label={incomeCategoryTransactionsPercentage.toFixed(2) + "%"} 
                />
              </div>
            )
          })}
        </div>
        <div className='expense-categories'>
          <h1 className='card-title'>Expense Categories</h1>
          <Divider my={20} />
          {categories.map((category) => {
            const expenseCategoryTransactionsAmount = transactions.filter((transaction) => transaction.type === "expense" && transaction.category === category.value)
              .reduce((acc, transaction) => {
                return acc + Number(transaction.amount);
              }, 0);

              const expenseCategoryTransactionsPercentage = (expenseCategoryTransactionsAmount / totalExpenseAmount) * 100;
            return (
              <div>
                <p>{category.label}</p>
                <Progress 
                  size={20}
                  color='red'
                  value={expenseCategoryTransactionsPercentage} 
                  label={expenseCategoryTransactionsPercentage.toFixed(2) + "%"} 
                />
              </div>
            )
          })}
        </div>
      </Group>
    </div>
  )
}

export default Analytics
