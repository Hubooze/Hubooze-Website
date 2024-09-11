const Product = require('../models/Product');


// Get all products with filtering, sorting, and pagination
exports.getAllProducts = async (req, res) => {
    try {
        const { category, sub_category, type, brand, size, minPrice, maxPrice, sortBy, order, page, limit } = req.query;
        const query = {};

        // Filtering
        if (category) query.category = category.toLowerCase();
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


exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Ensure image is an array of properly formatted URLs
        if (!Array.isArray(product.image)) {
            product.image = product.image.split(',').map(url => url.trim());
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        console.log("Request Body: ", req.body);  // Log the request body for debugging

        const { image, ...otherData } = req.body;

        const newProduct = new Product({
            ...otherData,
            image,
        });

        const product = await newProduct.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error("Error creating product: ", error);  // Log the actual error message
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update an existing product
exports.updateProduct = async (req, res) => {
    try {
        const { image, ...otherData } = req.body;

        // Sanitize and ensure image is an array of valid URLs
        const sanitizedImage = Array.isArray(image) ? image : image.split(',').map(url => url.trim());

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            ...otherData,
            image: sanitizedImage,
        }, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

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

        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};