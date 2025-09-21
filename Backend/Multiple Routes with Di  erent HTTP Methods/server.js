const express = require('express');
const app = express();
app.use(express.json());



app.get('/users', (req, res) => {
  res.status(200).json({message:"Get request: List of users"});
});

app.post('/users', (req, res) => {
  res.status(200).json({message:"Post request: Adding new users"});
});

app.put('/users/:id', (req, res) => {
  res.status(200).json({message:"Put request: Update users informations"});
});

app.delete('/users/:id', (req, res) => {
  res.status(200).json({message:"Delete request: Removing users"});
});

app.get("/about", (req, res) => {
  res.status(200).json({
    message: "This is a simple API  with GET, POST, PUT, DELETE routes at /users",
    author: "Khacha Akram",
    version: "1.0.0"
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
