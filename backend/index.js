const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require('dotenv').config();

const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order')
const shippingRoutes = require('./routes/shipping')


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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


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
app.use('/api/cart', cartRoutes);

// Routes Order/Payment
app.use('/api/payment', orderRoutes);

// Routes Shipping
app.use('/api/shipping', shippingRoutes);


//Image storage engine

const storage = multer.diskStorage({

    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        
    }
})

const upload = multer({ storage: storage })
// Creating images in point

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log("server is running " + process.env.PORT)
    }
    else {
        console.log("Error :" + error)
    }
});
