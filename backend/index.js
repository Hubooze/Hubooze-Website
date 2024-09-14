const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const rateLimit = require('express-rate-limit');

const mongoose = require("mongoose");

const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const wishlistRoutes = require('./routes/wishlist')
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order')
const shippingRoutes = require('./routes/shipping')

const errorHandler = require('./middlewares/errorHandler');
const { errors } = require('celebrate');
require('dotenv').config();

// Other Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Configure CORS

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true,
    optionsSuccessStatus: 204
  }));

app.options('*', cors()); // Enable pre-flight for all routes

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });

app.use(limiter);

app.set('trust proxy', 1); // trust first proxy

app.get("/", (req, res) => {
    res.send("Express App is Running")
})


// database connection with mongoosedb
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    }).then(() => {
        console.log('Db connected successfully');
    }).catch((err) => {
        console.log('Error:', err.message);
    });

// Routes Admin
app.use('/api/admin', adminRoutes);

// Route Product
app.use('/api/products', productRoutes);

// Routes User and Cart
app.use('/api/user', userRoutes);
app.use('api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);

// Routes Order/Payment
app.use('/api/payment', orderRoutes);

// Routes Shipping
app.use('/api/shipping', shippingRoutes);

// Error handling middlewares
app.use(errors());  // Celebrate Error Handling Middleware
app.use(errorHandler);  // Centralized error handling

app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log("server is running " + process.env.PORT)
    }
    else {
        console.log("Error :" + error)
    }
});
