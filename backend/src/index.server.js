const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();


// Routes
const adminRoutes = require('./routes/admin/auth');
const userRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const path = require('path');
const cors = require('cors');

// Load environment variables
env.config();

// MongoDB connection
mongoose.connect(
    process.env.DBURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log("Mongo DB connection successfully established 👌👌👌👌");
});

// Using body parser to parse JSON data
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files from the "uploads" directory
app.use('/public', express.static(path.join(__dirname, 'uploads')));

// Register routes
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
});
