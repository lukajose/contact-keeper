const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

//Connect DB 
connectDB();

//middleware
app.use(express.json({extended:false}));


app.get('/', (req,res)=> {
    res.send({msg:'Welcome to the contact keeper API!'});
})

app.use('/api/users',require('./routes/users'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/contacts',require('./routes/contacts'))

app.listen(PORT,() => console.log('Server is running on port:',PORT));