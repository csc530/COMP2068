// Import mongoose
const mongoose = require('mongoose');

// Expanded definition
const schemaDefinition = {
	jobTitle: {
		type: String,
		required: true,
	},
	description: String,
	applicationDate: Date,
	action: {
		type: Array.of(String),
		default: 'To Apply'
	},
	postedDate: Date,
	response: {
		enum: ['Accepted', 'Rejected', 'Pending'],
	},
	jobLink: String,
	uid: {
		type: String,
		required: true
	}
};
// Create a new mongoose schema using the definition object
var mongooseSchema = new mongoose.Schema(schemaDefinition);
// Create a new mongoose model using the mongoose schema and export the new model
module.exports = mongoose.model('Applications', mongooseSchema);
