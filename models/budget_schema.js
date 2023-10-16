const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
	category: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	amount: {
		type: Number,
		required: true,
		unique: false
	},
	color: {
		type: String,
		length: 7,
		lowercase: true
	}
}, {collection: 'budget'});

module.exports = mongoose.model('budget', budgetSchema);
