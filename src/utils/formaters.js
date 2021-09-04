import format from "date-fns/format"

export const formatDate = (date) => format(new Date(date), "P")

export const formatAmount = (amount) =>
  amount.toLocaleString("en-UK", { style: "currency", currency: "GBP" })
