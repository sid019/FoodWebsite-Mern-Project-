const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema ({
    name : {
        type : String,
        required : true,    
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    Date : {
        type : Date,
        default : Date.now, 
    }
});

module.exports = mongoose.model('user',userSchema);


//when we use this schema then collection is created by the name 'user' in the database