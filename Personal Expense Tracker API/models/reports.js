import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    budget: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Budget'
        }],
        required: true
    },
    totalExpenses: {
        type: Number,
        required: true,
        default: 0
    },
    expenses: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Expense'
        }],
        required: false
    },
}, { timestamps: true 
})

export const Report = mongoose.model("Report", reportSchema);
