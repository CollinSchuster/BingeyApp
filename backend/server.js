const path = require('path')
const cors = require("cors");
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000



connectDB()
const app = express()

// Added from chat vid index.js
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/bookmarks',require('./routes/bookmarkRoutes'))
// app.use("/user", require("./routes/userRoutes")); for vid
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));


//Serve frontend (you want to make sure you go under routes for this )
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'../frontend/build'))) // build is where react builds out the static folder

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html'))) // loads the index.html
} else {
  app.get('/',(req,res) => res.send('Please set to production'))
}


app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
