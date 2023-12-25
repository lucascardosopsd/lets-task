import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  descriptiion: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
    default: false,
  },
  important: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = models.User || model("User", userSchema);

export default User;
