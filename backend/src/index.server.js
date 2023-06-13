const express = require('express');
const env = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


// Routes
const adminRoutes = require('./routes/admin/auth');
const userRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initalData');
const createPageRoute = require('./routes/admin/page');

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

// Enable CORS
app.use(cors());


// Using body parser to parse JSON data
app.use(express.json());


// Serve static files from the "uploads" directory
app.use('/public', express.static(path.join(__dirname, 'uploads')));

// Register routes
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', createPageRoute);
// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
});
