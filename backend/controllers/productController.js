const Product = require('../models/Product');
// const redisClient = require('../cache');

// Function to set cache with a TTL (Time To Live)
const setCache = (key, data, ttl = 3600) => {
    redisClient.set(key, JSON.stringify(data), 'EX', ttl);
  };
  
// Function to get data from cache
const getCache = async (key) => {
const data = await redisClient.get(key);
return data ? JSON.parse(data) : null;
};

// Function to invalidate cache
const invalidateCache = async (pattern) => {
    const keys = await redisClient.keys(pattern);
    if (keys.length) {
      redisClient.del(keys);
    }
  };
  

// Get all products with filtering, sorting, and pagination
exports.getAllProducts = async (req, res) => {
    try {
        const { category, sub_category, type, brand, size, minPrice, maxPrice, sortBy, order, page, limit } = req.query;
        const query = {};

        // Filtering
        if (category) query.category = category;
        if (sub_category) query.sub_category = sub_category;
        if (type) query.type = type;
        if (brand) query.brand = brand;
        if (size) query.size = size;
        if (minPrice || maxPrice) {
            query.selling_price = {};
            if (minPrice) query.selling_price.$gte = minPrice;
            if (maxPrice) query.selling_price.$lte = maxPrice;
        }

        // Sorting
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        // Pagination
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;

        // Generate a cache key based on all the query parameters
        // const cacheKey = `products_${JSON.stringify(req.query)}`;
        // const cachedData = await getCache(cacheKey);

        // if (cachedData) {
        //     return res.status(200).json({ products: cachedData });
        // }

        const products = await Product.find(query)
            .sort(sortOptions)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        // setCache(cacheKey, products);

        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            totalProducts,
            page: pageNumber,
            totalPages: Math.ceil(totalProducts / pageSize),
            products,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const { sub_category, type, brand, size, minPrice, maxPrice, sortBy, order, page, limit } = req.query;

        const query = { category }; // Start with the category from the URL

        // Add other filters dynamically
        if (sub_category) query.sub_category = sub_category;
        if (type) query.type = type;
        if (brand) query.brand = brand;
        if (size) query.size = size;
        if (minPrice || maxPrice) {
            query.selling_price = {};
            if (minPrice) query.selling_price.$gte = minPrice;
            if (maxPrice) query.selling_price.$lte = maxPrice;
        }

        // Sorting
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        // Pagination
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;

        const products = await Product.find(query)
            .sort(sortOptions)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            totalProducts,
            page: pageNumber,
            totalPages: Math.ceil(totalProducts / pageSize),
            products,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();

        // Invalidate relevant caches
        // redisClient.del('products_all');
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an existing product
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Invalidate relevant caches
        // redisClient.del('products_all');
        // redisClient.del(`product_${id}`);

        res.status(200).json({ success: true, updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Invalidate relevant caches
        // redisClient.del('products_all');
        // redisClient.del(`product_${id}`);

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
