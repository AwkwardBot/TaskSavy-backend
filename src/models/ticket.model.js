const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticket_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TicketType'
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    url: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    assignee: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
    ],
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    due_date: {
        type: Date
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    sprint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sprint',
    },
    priority: {
        type: String,
        enum: ['Low', 'Normal', 'High'],
        default: 'Normal'
    },
    
    attachments: [
        {

          name: String, 
          url: String, 
          type: String 
        }
      ],
      comments: [
        {

          text: String, 
          author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          createdAt: Date 
        }
      ]
});



ticketSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.url = "none";
        this.status = "Pending";
    }
    next();
});


const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
