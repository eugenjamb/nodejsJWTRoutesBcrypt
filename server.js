require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/auth', authRouter)

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => console.log("MongoDB connected!"));



app.listen(PORT, () => console.log("Server running on port " + PORT))