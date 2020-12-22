const express = require('express');
const mongoose = require('mongoose');
require('./model/Student');
require('./model/Alumni');
require('./model/Schollarship');
const { MONGO_URI} = require('./config/keys');   
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes')
const schollarshipRoutes = require('./routes/schollarshipRoutes');

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true, 
    useFindAndModify:false
});
mongoose.connection.on('connected',()=>console.log('connected to mongo uri'));
mongoose.connection.on('err',(err)=>console.log({err}));

const app = express();
app.use(express.json());
app.use(authRoutes);
app.use(studentRoutes)
app.use(schollarshipRoutes)


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{console.log(`listen on port ${PORT}`)});