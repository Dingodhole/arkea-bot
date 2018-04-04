import mongoose from 'mongoose';

// Add Schema
export const reviewItemSchema = mongoose.Schema({
  menu:  String,
  sender: String,
  review:   Number,
  createdAt: Number
});
