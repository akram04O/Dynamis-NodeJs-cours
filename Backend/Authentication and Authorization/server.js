import express from 'express';

import mongoose from 'mongoose';

import auth from './routes/authRoutes.js';

const app = express();
app.use(express.json());


const dbURI = 'mongodb://127.0.0.1:27017/mydatabase';
mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


app.use('/api/auth', auth);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});