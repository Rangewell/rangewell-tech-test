import express from "express"
import * as db from "./data/models"

const routerApi = express.Router()

// DEALS - START
routerApi.get("/deals", async (req, res) => {
  let { title } = req.query

  if (title) {
    await db.dealsCollection.findOne(req.query).exec((err, result) => res.send(result))
  } else {
    await db.dealsCollection.find().exec((err, result) => res.send(result))
  }
})

routerApi.get("/deal/:id", async (req, res) => {
  let { id } = req.params
  await db.dealsCollection.findOne({ _id: id }).exec((err, result) => res.send(result))
})

routerApi.get("/deals/stats", async (req, res) => {
  let stats = {
    deals_count: 0,
    total_amounts: 0,
    avg_amount: 0,
  }
  await db.dealsCollection.find().exec((err, result) => {
    if (result.length) {
      stats.deals_count = result.length
      result.forEach((deal) => {
        stats.total_amounts += deal.amountRequired
      })
      stats.avg_amount = Math.round(stats.total_amounts / stats.deals_count)
    }
    res.send(stats)
  })
})
// DEALS - END

export default routerApi
