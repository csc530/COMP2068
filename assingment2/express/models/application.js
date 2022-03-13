// Import mongoose
const mongoose = require('mongoose');

// Expanded definition
const schemaDefinition = {
	jobTitle: {
		type: String,
		required: true,
	},
	appliedOn: {
		type: Date
	},
	response: {
		type: String,
		default: 'TO DO'
	}
};
// Create a new mongoose schema using the definition object
var mongooseSchema = new mongoose.Schema(schemaDefinition);
// Create a new mongoose model using the mongoose schema and export the new model
module.exports = mongoose.model('Project', mongooseSchema);
