const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		fullname: { type: String, minLength: 5, required: true },
		email: { type: String, unique: true, required: true },
		password: { type: String, minLength: 8, required: true },
		role: { type: String, default: "USER_ROLE" },
	},
	{ timestamps: true }, //display the created and updated date 
);
 

const userModel = model('User', userSchema);

module.exports = userModel;