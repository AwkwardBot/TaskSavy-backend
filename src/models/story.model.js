const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { defaultBoards } = require('../config/project');


const storySchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: String,
    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sprint', 
      required: true,
    },
  });



const Story = mongoose.model('Task', storySchema);

module.exports = Story;