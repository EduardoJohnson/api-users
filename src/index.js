const express = require('express')
const session = require('express-session')
const bcrypt = require('bcryptjs');
const {Pool} = require('pg/lib')
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const { serializeUser } = require('passport/lib');

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}));



//dba conection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1010',
    port: 5432,
  })
  pool.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  app.post('/cadastro', async ( req, res ) =>{
    const {id, name, email, password} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash =  bcrypt.hashSync(password, salt);
    console.log('senha')
    try {
        const cadastro = await pool.query('insert into users (id,name,email, password)values ($1, $2, $3, $4) returning *', [id, name, email, hash]);
        console.log('inseriur no banco')
        return res.status(200).send(cadastro.rows);
        
    } catch (error) {
        return res.status(400).send(error);
        
    }
}),


  
// autentication user
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
      const deserializer = pool.query('SELECT * FROM users WHERE id=$1 LIMIT 1', [id])
      done(id, deserializer);
    });

    passport.use(new LocalStrategy({
        name: 'name',
        password: 'password'
    },

    app.post('/login', async (req, res) => {
        const {name, password} = req.body;
        try {
            const user = await pool.query('SELECT * FROM users WHERE name=$1', [name])
            if (!user) { 
                return res.status(200).send(null, false)
                console.log(user,'passo um');
            }
            console.log(user,'passo um');
            const isValid =  bcrypt.compareSync(user.password, password);
                if (!isValid) { 
                    return res.status(200).send(null, false)
                     }
                return res.status(400).send(null, user)

            } catch (err) {
                res.status(400).send(err, false);
            }
                
    })),


  app.get('/users', async (req, res) => {
    try {
        const {rows} = await pool.query('select * from users')
        return res.status(200).send(rows);
    } catch (e) {
        return res.status(400).send(e);
    }

}),


app.listen(8530 , () => console.log('server on 3333'))
)
