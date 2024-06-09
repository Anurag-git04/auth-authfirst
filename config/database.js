const mongoose = require('mongoose');

exports.connect = ()=>{
    mongoose.connect('mongodb://localhost:27017/mydatabase',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => {
        console.log("SuccessFully connected to mongoose")
    }).catch((err) => {
        console.log("Error in building fconnection")
        process.exit(1);
    });
}