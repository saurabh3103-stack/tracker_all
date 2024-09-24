const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const app = express();
app.use(cors()); // Allow requests from any origin

app.use(bodyParser.json());
app.use(express.json());
const port = 3002;
const adminRoutes = require('./routes/admin');
const userRoutes= require('./routes/user')
const userPath = require('./routes/routes');
// MongoDB connection string
const dbURI = 'mongodb+srv://sb652515:Shivanshu%4031@cluster0.x5946.mongodb.net/';
// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes); // Use user routes
app.use('/api/userPath', userPath);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


