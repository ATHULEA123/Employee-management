const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    // user_id: {
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:"user",
    // },
  
    salutation:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },

    phone:{
        type:String,
        required:true,
    },
    qualifications:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    pin:{type:String,
        require:true,
    },
    image:{
        type:String,
        require:false,
        
    }
},
{
    timestamps:true,
});

module.exports = mongoose.model("employee",employeeSchema);