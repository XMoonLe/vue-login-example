const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username required'],
    },
    password: {
      type: String,
      required: [true, 'Password required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

module.exports = model('User', UserSchema)
