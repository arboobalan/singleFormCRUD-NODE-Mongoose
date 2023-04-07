const  mongoose  = require("mongoose");

const mySchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    mobile: {
        type:Number,
        required:true
    }},{
        timestamps:true,
        versionKey:false
});

module.exports = mongoose.model('myUser', mySchema,'myUser');