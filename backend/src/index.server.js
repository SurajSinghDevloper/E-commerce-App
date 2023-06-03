const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//routes
const adminRoutes = require('./routes/admin/auth');
const userRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

//enviroment variable or you can say constant 
env.config();

//mongodb connection
//mongodb+srv://suraj31kumar1999:<password>@cluster0.gnqtqdz.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(
    process.env.DBURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log("Mongo DB connection successfully established 👌👌👌👌");
});
//using body parser to parse the json data
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on PORT ${process.env.PORT}`);
});