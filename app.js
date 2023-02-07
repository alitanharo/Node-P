const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT|| 3000
const sessionsRouter = require('./src/routers/sessionsRouter')
const adminRouter = require('./src/routers/adminRouter')



app.use(express.static(path.join(__dirname,'/public/')))
app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use('/sessions', sessionsRouter)
app.use('/admin', adminRouter)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})