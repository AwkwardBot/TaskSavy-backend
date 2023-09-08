const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');
const { defaultBoards } = require('../config/project');


const taskSchema = new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },
    description: String,
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Done'], 
      default: 'To Do',
    },
    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sprint',
    },
    
  });
  
  const Task = mongoose.model('Task', taskSchema);
  
  module.exports = Task