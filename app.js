import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes/index.js"

const app = express()
dotenv.config()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/", routes)

app.listen(port, () => {
    console.log(`🟢 SERVER ON: http://${process.env.HOST}:${process.env.PORT}`)
})