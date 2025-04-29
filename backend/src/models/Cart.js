const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }],
  total: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total when cart is modified
cartSchema.methods.calculateTotal = function() {
  this.total = this.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

module.exports = mongoose.model('Cart', cartSchema); 