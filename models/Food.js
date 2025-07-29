import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isVegetarian: {
    type: Boolean,
    default: false,
  },
  isVegan: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },

  // ✅ FIXED: allow string-based restaurant IDs like "1234"
  restaurants: [{
    type: String,
    required: true,
  }]
});

export default mongoose.models.Food || mongoose.model('Food', foodSchema);
