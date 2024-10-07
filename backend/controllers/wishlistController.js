const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Get User Wishlist
exports.getWishlist = async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 10 } = req.query;

  try {
    const wishlist = await Wishlist.findOne({ userId })
      .populate('products.productId')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    res.status(200).json({ wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add Product to Wishlist
exports.addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    const productExists = wishlist.products.find(p => p.productId.toString() === productId.toString());

    if (!productExists) {
      wishlist.products.push({ productId });
      await wishlist.save();
      return res.status(201).json({ message: 'Product added to wishlist' });
    } else {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Remove Product from Wishlist
exports.removeFromWishlist = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(p => p.productId.toString() !== productId);
      await wishlist.save();
      res.status(200).json({ message: 'Product removed from wishlist' });
    } else {
      res.status(404).json({ message: 'Wishlist not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
