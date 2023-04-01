import { Group, Table } from '@mantine/core'
import React from 'react'

function TransactionTable({ transactions }) {
  const getRows = transactions.map((transaction) => (
    <tr key={transaction.name}>
      <td>{transaction.name}</td>
      <td>{transaction.type[0].toUpperCase() + transaction.type.slice(1)}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.date}</td>
      <td>{transaction.category}</td>
      <td>{transaction.reference}</td>
      <td>
        <Group>
          <i className="ri-pencil-line"></i>
          <i className="ri-delete-bin-line"></i>
        </Group>
      </td>
    </tr>
  ));

  return (
    <Table verticalSpacing={"md"} fontSize={"sm"} striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
          <th>Reference</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{getRows}</tbody>
    </Table>
  )
}

export default TransactionTable
