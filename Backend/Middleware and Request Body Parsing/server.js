const express = require('express');
const app = express();
app.use(express.json());

const users = [];


app.post('/users', (req, res) =>{
  const { name, email} = req.body;

  if(name == '' || email == ''){
    res.status(400).json({ error: 'Both name and email are required' });
  }

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
