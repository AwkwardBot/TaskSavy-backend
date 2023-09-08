const mongoose = require('mongoose');



const sprintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  // You can add more fields as needed for your project.
});

const Sprint = mongoose.model('Sprint', sprintSchema);

module.exports = Sprint;
