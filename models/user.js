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

    // ✅ OPTIONAL for Sprint 12
    email: {
      type: String,
      required: false,
      unique: false,
      sparse: true,
      lowercase: true,
      validate: {
        validator: (v) => !v || validator.isEmail(v),
        message: "Invalid email",
      },
    },

    // ✅ OPTIONAL for Sprint 12
    password: {
      type: String,
      required: false,
      select: false,
    },

    avatar: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Invalid avatar URL",
      },
    },
  },
  { timestamps: true }
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
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