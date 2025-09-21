import mongoose from "mongoose";

const expenseShema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    
}, { timestamps: true 
})

export const Expense = mongoose.model("Expense", expenseShema);