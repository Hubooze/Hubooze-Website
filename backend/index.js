const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
const cors = require("cors");
require('dotenv').config();
const { type } = require("os");
const { error } = require("console");
const adminRoutes = require('./routes/admin');
const womenRoutes = require('./routes/women');
const menRoutes = require('./routes/men');
const kidsRoutes = require('./routes/kids');
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


//API creation

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
app.use('/api/admin/women', womenRoutes);
app.use('/api/admin/men', menRoutes);
app.use('/api/admin/kids', kidsRoutes);


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
// Creating imagems ind point

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message
      }
    });
  });

app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log("server is running " + process.env.PORT)
    }
    else {
        console.log("Error :" + error)
    }
});


// app.post('/addproduct', async (req, res) => {
//     let products = await Product.find({})
//     let id;
//     if (products.length > 0) {
//         let last_product_array = products.slice(-1);
//         let last_product = last_product_array[0];
//         id = last_product.id + 1;
//     }
//     else {
//         id = 1;
//     }

//     const newProduct = new Product({
//         id: id,
//         name: req.body.name,
//         image: req.body.image,
//         category: req.body.category,
//         new_price: req.body.new_price,
//         old_price: req.body.old_price,
//         date: req.body.date, // Assuming you're passing the date in the request body
//         available: req.body.available // Assuming you're passing the availability in the request body
//     });

//     console.log(newProduct);
//     await newProduct.save();
//     console.log("saved");

//     res.json({
//         success: true,
//         name: req.body.name,
//     });

// });



// app.post('/removeproduct', async (req, res) => {
//     await Product.findOneAndDelete({ id: req.body.id })
//     console.log("Removed");
//     res.json({
//         success: true,
//         name: req.body.names
//     });
// })


// // creating API for getting product

// app.get('/allproducts', async (req, res) => {
//     let products = await Product.find({});
//     console.log("All Product Fetched");
//     res.send(products);
// }
// )


// creating endpoint of api

// app.get('/newcollections', async (req, res) => {
//     let products = await Product.find({});
//     let newcollections = products.slice(1).slice(-8);
//     res.setHeader('Content-Type', 'application/json');
//     console.log("New collection Fetched");
//     res.send(newcollections);
// })

// app.get('/latestcollection',async(req,res)=>{
//     let products = await Product.find({});
//     let latestcollection = products.slice(4).slice(12);
//     res.setHeader('Content-Type', 'application/json');
//     console.log("New collection Fetched");
//     res.send(latestcollection);
// })

// app.get('/offers', async (req, res) => {
//     let products = await Product.find({ category: "women" });
//     let offers = products.slice(1, 8);
//     console.log("Popular in woman Fetched");
//     res.send(offers);
// })

// app.get('/popularinwoman', async (req, res) => {
//     let products = await Product.find({ category: "women" });
//     let popularinwoman = products.slice(0, 4);
//     res.setHeader('Content-Type', 'application/json');
//     console.log("Popular in woman Fetched");
//     res.send(popularinwoman);
// })


// app.post("/api/create-checkout-session",async(req,res)=>{
//     const {products} = req.body;


//     const lineItems = products.map((product)=>({
//         price_data:{
//             currency:"inl",
//             product_data:{
//                 name:product.name,
//                 images:[product.image]
//             },
//             unit_amount:product.price * 100,
//         },
//         quantity:product.quantity
//     }));

//     const session = await stripe.checkout.sessions.create({
//         payment_method_types:["card"],
//         line_items:lineItems,
//         mode:"payment",
//         success_url:"http://localhost:3000/sucess",
//         cancel_url:"http://localhost:3000/cancel",
//     });

//      res.json({id:session.id})
 
// })

// payment intergection

// app.post('/payment', async (req, res) => {

//     const product = await stripe.products.create({
//         name:"T-Shirt"
//     });

    
//     if(product){
//         var price = await stripe.prices.create({
//             product: `${product.id}`,
//             unit_amount: 300 * 100,
//             currency:'inr',
//         });
//     }


//     if(price.id){
//        var session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//                 price: `${price.id}`,
//                 quantity: 1,
//             }
//         ],
//         mode:'payment',
//         success_url: 'http://localhost:3000/success',
//         cancel_url: 'http://localhost:3000/cancel',
//         customer_email:'demo@gmail.com'

//        }) 
//     }

//     res.json(session)
// });