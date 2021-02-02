const { urlencoded } = require('body-parser');
const express = require('express')
const Batch = require('./models/batchModel')

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

//routing
app.get('/', (req,res)=>{
    res.send('Hello')
})

//FIRST PART - creating a class

app.post('/create-class', async (req,res)=>{
    const batch = await Batch.create(req.body);
    try{
        res.status(201).json({
            status: 'success',
            data: {
                batch
            }
        })
    } catch(err){
        console.log(err) 
    }
})

//SECOND PART - get all future batch
app.get('/upcoming-class', async(req,res)=>{
    const batch = await Batch.find({start:{"$gte" : new Date()}});
    try{
        res.status(200).json({
            status: 'success',
            results: batch.length,
            data: {
                batch
            }
        });
    } catch(err){
        res.status(401).json({
            status: 'fail',
            message: 'Something went wrong'
        });
    }
})

//THIRD PART - get classes only on query search
app.get('/classes', async(req,res)=>{
    const batch = await Batch.find(req.query);
    try{
        res.status(200).json({
            status: 'success',
            results: batch.length,
            data: {
                batch
            }
        });
    } catch(err){
        res.status(401).json({
            status: 'fail',
            message: 'Something went wrong'
        });
    }
})

module.exports = app;