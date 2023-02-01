const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT|| 3000
const sessionsRouter = express.Router();
const sessions = require('./src/data/post.json')


app.use(express.static(path.join(__dirname,'/public/')))
app.set('views', './src/views')
app.set('view engine', 'ejs')
sessionsRouter.route('/')
.get((req,res)=>{
    res.render('sessions',{sessions,})
})

app.use('/sessions',sessionsRouter)
app.get('/', (req,res)=>{
    res.render('index',{title:'welcome to ejs!'})

})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})