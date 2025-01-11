
import mongoose from "mongoose";

// Define the schema for a book
const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  genre: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  rentalStatus: { type: Boolean, required: true },
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

export default User;