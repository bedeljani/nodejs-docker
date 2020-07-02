'use strict'

const cors = require('cors')
const express = require('express')
const logger = require('morgan')
const app = express()

const mongoose = require('mongoose');
const userSchema = require('./models/users')

require('dotenv').config()
const {MONGO_URL, PORT} = process.env

const port = PORT || 4000 ;
const uri = MONGO_URL || `mongodb://username:password@hostname:port/database`

const options = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false};

mongoose.connect(uri,options)
		.then(() => {
		  console.info('DB Connected')
		})
		.catch((e) => {
        console.log(e);
		console.error('Error: DB not connected')
		})

// middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// for security disable the X-Powered-By header
app.disable('x-powered-by')


// GET method route
app.get('/',  (req, res) => {
  res.status(200).send('Hello world')
})

app.post('/create', async (req, res) => {
    const add = await userSchema.create(req.body);
    res.status(200).send(add)
})

app.get('/find', async (req, res) => {
    const {id,name} = req.query
    console.log(mongoose.Types.ObjectId(1234567891012));
    
    const find = await userSchema.find({$or:[{'_id': mongoose.Types.ObjectId(id)}, {name: {'$regex': name, '$options': 'i'}}]});
    res.status(200).send(find)
})

app.delete('/delete/:id', async (req, res) => {
    const {id} = req.params
    const del = await userSchema.deleteOne({_id:id})
    res.status(200).send(del)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Path Not Found')
    err.status = 404
    err.code = 404
    next(err)
})

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .send({
            message: err.message,
            code: err.code || 0
        })
})


/*create server http or https*/
const server = require('http').createServer(app);
if (!module.parent) {
    server.listen(port, "0.0.0.0", () => {
        console.log(`Server Running on port ${port} !`)
    })
}

module.exports = app