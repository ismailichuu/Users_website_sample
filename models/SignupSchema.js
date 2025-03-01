
import mongoose from "mongoose";

//Mongo Schema
const signUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true,
    },

    email: {
        type: String,
        required: true,
        unique : true,
        lowercase : true,
    },

    password: {
        type: String,
        required: true,
    },

    admin : {
        type: Boolean,
        required: false,
    }
});

//create model
const User = mongoose.model('users', signUpSchema);

export default User;