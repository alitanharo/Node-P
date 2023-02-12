const express = require('express')
const { MongoClient } = require('mongodb')
const passport = require('passport')

const authRouter = express.Router()

authRouter.route('/signup').post(async (req, res) => {
    const { username, password } = req.body;
    const url =
        'mongodb+srv://ali:AMgSQrOtN4RpTtGn@node-p.gcafrmx.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'mydb'

    console.log('signup route called', username, password)

    async function addUser() {

        let client;
        try {
            client = await MongoClient.connect(url)

            const db = client.db(dbName)
            const user = { username, password }
            console.log('inserting user into database', user)
            const results = await db.collection('users').insertOne(user)
            console.log('user inserted successfully', db.users)
         

            req.login(results.insertedId, () => {
                res.redirect('/auth/profile')
            })



        } catch (error) {
            console.error(error)
        } finally {
            client.close()
        }



    }
    addUser().catch(error => console.log(error))

})


authRouter.route('/signin')
.get((req, res) => {
    res.render('signin')

})
.post(passport.authenticate('local',{
    successRedirect:'/auth/profile',
    failureMessage:'/',
}))

authRouter.route('/profile').get((req, res) => {
    res.json(req.user)
})

module.exports = authRouter;
