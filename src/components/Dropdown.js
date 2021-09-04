import React from "react"

import { formatDate } from "../utils/formaters"

const Dropdown = ({ setSelected, dates }) => {
  const handleSelect = (e) => {
    e.preventDefault()
    setSelected(e.target.value)
  }

  return (
    <select autoFocus onChange={(e) => handleSelect(e)}>
      <option value="">Select a date</option>
      {dates.map((date) => (
        <option key={date} value={date}>
          {formatDate(date)}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
