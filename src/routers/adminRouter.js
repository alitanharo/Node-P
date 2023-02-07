const  express = require('express')
const adminRouter = express.Router()
const {MongoClient} = require('mongodb')
const sessions = require('../data/post.json')

adminRouter.route('/').get((req,res)=>{
    
    const url = 
    'mongodb+srv://ali:AMgSQrOtN4RpTtGn@node-p.gcafrmx.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'mydb'

            async function mongo() {
                
                let client = new MongoClient(url);
                try {
                    await client.connect(url)
                    const db = client.db(dbName)
                    const response = await db.collection('sessions').insertMany(sessions)
                  
                    res.json(response)
                } catch (error) {
                    
                    console.log(error);
                }
                finally {
    
    await client.close();
  }

            }
            mongo().catch(console.error())
})









module.exports= adminRouter;