const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    username:{
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    }
  },
  {timestamps: true}
);

// Hash the password before saving:
userSchema.pre("save", async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
});

// Compare the password method:
userSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports= mongoose.models.User || mongoose.model("User",userSchema);
