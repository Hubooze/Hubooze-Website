const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
      quantity: { type: Number, required: true, default: 1 },
      addedAt: { type: Date, default: Date.now }
    }],
    updatedAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Cart', CartSchema);
  