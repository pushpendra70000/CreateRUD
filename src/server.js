const express =  require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
env.config();

mongoose.connect('mongodb://localhost:27017')
.then((d)=>{
    console.log('connected')
})
.catch((d)=>{
    console.log('not connected')
})

let dataSchema = new mongoose.Schema({
        StudentId:Number,
        Name:String

},{
    timestamps:true
});

const data = mongoose.model('data', dataSchema);

app.get('/api/student/create',(req,res)=>{

        let dataObject = new data({
            StudentId:req.query.StudentId,
            Name:req.query.Name

        });
        dataObject.save()
        .then((d)=>{
            console.log('saved')
            res.status(201).json({
                msg:"student created succesfully "
            })
        })
        .catch((e)=>{
               
    res.status(400).json({
        msg:"error"
    }); 
        });

});

let port = process.env.PORT
app.listen(port,()=>{
    console.log('this server is running on ', port)

})