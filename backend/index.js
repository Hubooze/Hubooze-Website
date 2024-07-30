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
// const stripe = require("stripe")("sk_test_51PAVq2SAtSBHIsrz3h8gHqE4z9WQU6rY6AYJ6JfLvff3Qiy7vBdmvtrImAeNL9guVQoZ2taVCQG0jInH2K4i0OTq00Tj1QZyPI");
const adminRoutes = require('./routes/admin');


// Other Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Configure CORS

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
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

mongoose.connect(process.env.MONGODB_URI
    ).then(() => {
        console.log('Db connected successfully');
    }).catch((err) => {
        console.log('Error:', err.message);
    });


// Routes
app.use('/api/admin', adminRoutes);


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


// Shema creating for user model 


const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }

})

// Creating endpoint of user registions

app.post('/signup', async (req, res) => {

    let check = await Users.findOne({ email: req.body.email })

    if (check) {
        return res.status(400).json({ success: false, error: "exiting user found with email id and addresss" })
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token })

})

// Creating endpoint for user login

app.post('/login', async (req, res) => {

    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passwordCompare = req.body.password === user.password;

        if (passwordCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, errors: "wrong password" })
        }
    }
    else {
        res.json({ success: false, errors: "worng Email Id" })
    }

})


// Creating middelware to fetch user

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "please authenicate using valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }
        catch (error) {
            res.status(401).send({ errors: "Plz authentications" })
        }
    }
}


// Creating endpoint for adding to cart
app.post('/addtocart',fetchUser, async (req, res) => {
    console.log("Added",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id}) ;
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

//Creating endpoint for remove product from cartdata

// Endpoint to remove an item from the cart
app.post('/removefromCart', fetchUser, async (req, res) => {
    try {
        console.log("remove", req.body.itemId);
        let userData = await Users.findOne({ _id: req.user.id });
        if (userData && userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
            await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        }
        res.send("remove");
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).send("Error removing item from cart");
    }
});

// Endpoint to get cart data
app.get('/getcart', fetchUser, async (req, res) => {
    try {
        console.log("GetCart");
        let userData = await Users.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error getting cart data:", error);
        res.status(500).send("Error getting cart data");
    }
});

// payment intergection

app.post('/payment', async (req, res) => {

    const product = await stripe.products.create({
        name:"T-Shirt"
    });

    
    if(product){
        var price = await stripe.prices.create({
            product: `${product.id}`,
            unit_amount: 300 * 100,
            currency:'inr',
        });
    }


    if(price.id){
       var session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: `${price.id}`,
                quantity: 1,
            }
        ],
        mode:'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        customer_email:'demo@gmail.com'

       }) 
    }

    res.json(session)
});

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