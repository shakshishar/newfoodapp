// models/Restaurant.js
import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  _id: {
    type: String,  // 🔄 Force `_id` to be a string (e.g. "1234")
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);
