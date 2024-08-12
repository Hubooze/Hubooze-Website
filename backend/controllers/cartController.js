const User = require('../models/User');
const redis = require('redis');
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    let user = await User.findById(userId);
    user.cartData.set(itemId, (user.cartData.get(itemId) || 0) + 1);
    await user.save();

    redisClient.setex(`cart:${userId}`, 3600, JSON.stringify(Object.fromEntries(user.cartData)));
    res.send("Added to cart");
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send("Error adding to cart");
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    let user = await User.findById(userId);
    if (user.cartData.has(itemId)) {
      user.cartData.set(itemId, Math.max(user.cartData.get(itemId) - 1, 0));
      if (user.cartData.get(itemId) === 0) {
        user.cartData.delete(itemId);
      }
      await user.save();
      redisClient.setex(`cart:${userId}`, 3600, JSON.stringify(Object.fromEntries(user.cartData)));
    }
    res.send("Removed from cart");
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).send("Error removing item from cart");
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    redisClient.get(`cart:${userId}`, async (err, data) => {
      if (data) {
        res.json(JSON.parse(data));
      } else {
        let user = await User.findById(userId);
        redisClient.setex(`cart:${userId}`, 3600, JSON.stringify(Object.fromEntries(user.cartData)));
        res.json(Object.fromEntries(user.cartData));
      }
    });
  } catch (error) {
    console.error("Error getting cart data:", error);
    res.status(500).send("Error getting cart data");
  }
};
