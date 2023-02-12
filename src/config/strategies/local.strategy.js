const passport = require('passport')

const {Strategy} = require('passport-local');
const{MongoClient}=require('mongodb')


module.exports = function localStrategy() {
    passport.use(new Strategy({ usernameField: 'username', passwordField: 'password' },

        async (username, password, done) => {
            const url =
                'mongodb+srv://ali:AMgSQrOtN4RpTtGn@node-p.gcafrmx.mongodb.net/?retryWrites=true&w=majority'
            const dbName = 'mydb'

            try {
                const client = new MongoClient(url, { useUnifiedTopology: true });
                await client.connect();
                const db = client.db(dbName);
                const user = await db.collection('users').findOne({ username });
                if (user && user.password === password) {
                    done(null, user);
                } else {
                    done(null, false);
                }
                client.close();
            } catch (error) {
                done(error, false);
            }
        }
    ));
};





