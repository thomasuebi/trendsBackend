import express from "express"
import googleTrends from "google-trends-api"
import { asyncForEach } from "../helpers/async"

const router = express.Router()

/* GET users listing. */
router.all("/", async function(req, res, next) {
  const periods = ["2016", "2017", "2018", "2019", "2020"]
  const data = {}
  await asyncForEach(periods, async period => {
    const periodData = await googleTrends.interestByRegion({
      keyword: req.body.searchTerm,
      startTime: new Date(period + "-01-01"),
      endTime: new Date(period + "-12-31")
    })
    data[period] = JSON.parse(periodData).default.geoMapData
  })
  res.send(
    JSON.stringify(data)
    // JSON.stringify([({ iso2: "DE", "2017": 0.5 }, { iso2: "US", "2017": 0.8 })])
  )
})

module.exports = router
