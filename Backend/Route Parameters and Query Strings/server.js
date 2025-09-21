const express = require('express');
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: 'John Doe', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 25, city: 'New York' },
  { id: 3, name: 'Alice Johnson', age: 28, city: 'Chicago' },
];

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    if(isNaN(userId)){
        res.json({message: `User ID is must be a number `})
    }

    const user = users.find(u =>u.id === parseInt(userId));

    if(user){
        res.json(user);
    }else{
        res.status(404).json({ message: 'User not found' });
    }
});


app.get('/search', (req, res) => {
    const { name, age, city } = req.query;

    let results = users;

    if (name) {
        results = results.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (age) {
        results = results.filter(user => user.age === parseInt(age));
    }

    if (city) {
        results = results.filter(user => user.city.toLowerCase().includes(city.toLowerCase()));
    }

    res.json(results);
});









app.listen(3000, () => {
  console.log('Server is running on port 3000');
});