const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },

    createdAt: {
        type: String,
        validate: {
            validator: function (date) {
                // Check if the value is a valid date in the format "YYYY-MM-DD"
                return /^\d{4}-\d{2}-\d{2}$/.test(date);
            },
            message: props => `${props.value} is not a valid date in the format "YYYY-MM-DD"`
        },
        default: () => new Date().toISOString().split('T')[0] // Set default value to today's date
    }
});




const taskModel = mongoose.model('tasks', taskSchema);

module.exports = { taskModel };
