const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { defaultBoards, defaultTags } = require('../config/project');

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  key: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 4,
    validate(value) {
      if (!value.match(/^[a-zA-Z0-9-]+$/)) throw new Error('Invalid Key');
    },
  },
  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },

  status: {
    type: String,
    enum: ['Pending', 'Working', 'Completed'],
    default: 'Working',
  },

  activeStatus: {
    type: String,
    enum: ['Active', 'Archive', 'Deleted'],
    default: 'Active',
  },

  boards: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      color: {
        type: String,
        required: true,
      },
      order: {
        type: Number
      }
    },
  ],

  tags: [
    {
      name: {
        type: String,
        trim: true,
      },
    },
  ],

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
});

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

/**
 * Check if user has an empty project slot available in selected plan
 * @param {userObject} user - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
// projectSchema.statics.isSlotAvailable = async function () {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

projectSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.boards = defaultBoards;
    this.tags = defaultTags;
  }

  next();
});

/**
 * @typedef Project
 */
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
