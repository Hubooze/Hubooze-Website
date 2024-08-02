const User = require('../models/User');

exports.addToCart = async (req, res) => {
    try {
        console.log("Added", req.body.itemId);
        let userData = await User.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added");
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send("Error adding to cart");
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        console.log("remove", req.body.itemId);
        let userData = await User.findOne({ _id: req.user.id });
        if (userData && userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
            await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        }
        res.send("Removed");
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).send("Error removing item from cart");
    }
};

exports.getCart = async (req, res) => {
    try {
        console.log("GetCart");
        let userData = await User.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    } catch (error) {
        console.error("Error getting cart data:", error);
        res.status(500).send("Error getting cart data");
    }
};
