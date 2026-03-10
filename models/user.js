import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      lowercase: true,
      validate: {
        validator: (value) => value == null || validator.isEmail(value),
        message: "Invalid email",
      },
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Invalid avatar URL",
      },
    },
  },
  { timestamps: true }
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user || !user.password) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        return user;
      });
    });
};

export default mongoose.model("user", userSchema);
