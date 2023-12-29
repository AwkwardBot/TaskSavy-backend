const mongoose = require('mongoose');


const linkedTicketSchema = new mongoose.Schema({
  issue_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  linked_issue_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  link_type: {
    type: String,
    enum: ['related', 'blocking', 'blockedBy', 'duplicate', 'parentChild', 'predecessorSuccessor'],
    required: true
  },
  
});

const LinkedTicket = mongoose.model('LinkedTicket', linkedTicketSchema);

module.exports = LinkedTicket;
