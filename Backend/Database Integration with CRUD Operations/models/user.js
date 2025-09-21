import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;