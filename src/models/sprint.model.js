const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
  title: {
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
  actualStartDate: {
    type: Date,
  },
  actualEndDate: {
    type: Date,
  },
  status: {
    type: String,
    emum: ['Pending', 'Started', 'Finished'],
    default: 'Pending ',
  },
  description: String,
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
});

const Sprint = mongoose.model('Sprint', sprintSchema);

module.exports = Sprint;
