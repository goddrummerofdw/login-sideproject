import mongoose from "mongoose";
const { Schema } = mongoose;

const connect = mongoose.createConnection(process.env.MONGODB_URI as string)

const createUSerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
const User = connect.model('User', createUSerSchema);

export default User