const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");


const connectDB = async () => {
    
    try {
        await mongoose.connect(db, {
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true})    
        console.log('All good DB connected');
    } catch(e) {
        console.log('An error ocurred in the DB');
        process.exit(1);
    }
    
}


module.exports = connectDB;