import React, { useState, useEffect, useCallback } from "react"

import Dropdown from "./components/Dropdown"
import Table from "./components/Table"

import { api } from "./services/api"
import { formatAmount } from "./utils/formaters"

import logo from "./assets/logo.svg"
import "./styles/App.css"

const App = () => {
  const [deals, setDeals] = useState([])
  const [stats, setStats] = useState({
    deals_count: 0,
    total_amounts: 0,
    avg_amount: 0,
  })
  const [dates, setDates] = useState([])
  const [selected, setSelected] = useState("")

  const fetchData = async () => {
    await api.get("deals").then((res) => setDeals(res.data))
    await api.get("deals/stats").then((res) => setStats(res.data))
  }

  const fetchDates = useCallback(() => {
    const dates = deals.map((deal) => deal.createdAt)
    const uniqueDates = [...new Set(dates)]
    setDates(uniqueDates)
  }, [deals])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchDates()
  }, [fetchDates])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <main className="BodyContent">
        <div>
          <h1>
            Deals <small className="text-muted">({stats.deals_count})</small>
          </h1>
          <ul>
            <li>Total amounts: {formatAmount(stats.total_amounts)}</li>
            <li>Average amount: {formatAmount(stats.avg_amount)}</li>
          </ul>
        </div>

        <Dropdown setSelected={setSelected} dates={dates} />

        <Table deals={deals} selected={selected} />
      </main>
    </div>
  )
}
export default App
