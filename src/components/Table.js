import React, { useState, useEffect, useCallback } from "react"

import { formatAmount, formatDate } from "../utils/formaters"

const Table = ({ deals, selected }) => {
  const [currentDeals, setCurrentDeals] = useState(deals)

  const handleFilter = useCallback(() => {
    if (selected) {
      const filteredDeals = deals.filter((deal) => deal.createdAt === selected)
      setCurrentDeals(filteredDeals)
    } else {
      setCurrentDeals(deals)
    }
  }, [selected, deals])

  useEffect(() => {
    setCurrentDeals(deals)
  }, [deals])

  useEffect(() => {
    handleFilter()
  }, [handleFilter])

  return (
    <table cellSpacing={0}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Amount required</th>
          <th>Created at</th>
          <th>Updated at</th>
        </tr>
      </thead>

      <tbody>
        {[...currentDeals]
          .sort((a, b) => a.createdAt < b.createdAt)
          .map((deal) => (
            <tr key={deal._id}>
              <td>{deal.title}</td>
              <td>{formatAmount(deal.amountRequired)}</td>
              <td>{formatDate(deal.createdAt)}</td>
              <td>{formatDate(deal.updatedAt)}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default Table
