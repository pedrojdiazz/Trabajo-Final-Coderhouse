import mongoose from "mongoose";



const usersCollection = "users";


const userSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true,
        unique: true, 
        index: true
    }, 
    age: {
        type: Number, 
        required: true
    },
    password: {
        type: String, 
        required: true
    }, 
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

userSchema.pre("findOne", function(next){
    this.populate("cart");
    next();
})

const UserModel = new mongoose.model(usersCollection, userSchema);

export default UserModel