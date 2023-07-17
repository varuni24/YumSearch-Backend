import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName: {
        type: String,
    },
    userEmail: {
        type: String,
        required: [true, "Email is required"]
    },
    userPassword: {
        type: String,
        required: [true, "Password is required"]
    },
    userFavorites: {
        type: [Object],
    },
}, {
    collection: "users"
})

export const userModel = mongoose.model('userModel', userSchema)

export const createNewUser = (user) => userModel.create(user)
export const getAllUsers = () => userModel.find()
export const findExistingUser = (filter) => userModel.findOne(filter);