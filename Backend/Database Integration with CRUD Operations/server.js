import express from 'express';
import mongoose from 'mongoose';
import User from './models/user.js';

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});


app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findById(userID);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      userID,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await User.findByIdAndDelete(userID);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
