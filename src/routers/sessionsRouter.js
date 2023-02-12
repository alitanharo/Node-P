
const express = require('express')
const sessions = require('../data/post.json')
const sessionsRouter = express.Router();
const { MongoClient,ObjectId } = require('mongodb')

sessionsRouter.use((req,res,next)=>{
    if(req.user){
        next()
    }
    else{
        res.redirect('/auth/signin')
    }
})

sessionsRouter.route('/').get((req, res) => {
    const url =
        'mongodb+srv://ali:AMgSQrOtN4RpTtGn@node-p.gcafrmx.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'mydb'

        async function mongo() {
            let client = new MongoClient(url);
            try {
                await client.connect(url)
                const db = client.db(dbName)
                const sessions = await db.collection('sessions').find().toArray()
                res.render('sessions',{sessions})
            } catch (error) {

                console.log(error);
            }
            client.close()

        }
        mongo().catch(console.error())
})


sessionsRouter.route('/:id').get((req, res) => {
    const id = req.params.id

    const url =
        'mongodb+srv://ali:AMgSQrOtN4RpTtGn@node-p.gcafrmx.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'mydb'

    async function mongo() {
        let client = new MongoClient(url);
        try {
            await client.connect(url)
            const db = client.db(dbName)
            const session = await db.collection('sessions').findOne({ _id: new ObjectId(id)})
            res.render('session', { session})
        } catch (error) {

            console.log(error);
        }
        client.close()

    }
    mongo().catch(console.error())

   
})




module.exports = sessionsRouter;