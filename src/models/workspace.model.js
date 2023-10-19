const mongoose = require('mongoose');

// Define the Workspace Schema
const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: String,
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      role: {
        type: String,
        enum: ['Admin', 'Manager', 'Member'],
        required: true,
      },
    },
  ],

  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;
