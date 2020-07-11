const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const path = require('path');
//Connect DB 
connectDB();

//middleware
app.use(express.json({extended:false}));

app.use('/api/users',require('./routes/users'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/contacts',require('./routes/contacts'))

if(process.env.NODE_ENV==='production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=> {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,() => console.log('Server is running on port:',PORT));