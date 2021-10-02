//imports
const express = require('express')
const cros = require('cors')
const dotenv = require('dotenv')
require('./db')

//init
const app = express()
dotenv.config()

//middlewere
app.use( cros() )
app.use( express.json() )

app.use('/auth', require('./routes/auth') )
app.use('/form', require('./routes/form') )
app.use('/reports', require('./routes/reports') )
app.use('/vacations_view', require('./routes/vacations_view') )
app.use('/vacation_edit',require('./routes/vacation_edit'))


//routs
app.get('/', (req, res)=>{
    res.send("<h1>Welcome</h1>")
    })

//run the server
app.listen(1000, ()=>console.log('server is listening on port 1000. visit: http://localhost:1000'))
