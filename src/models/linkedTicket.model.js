const mongoose = require('mongoose');

const linkedTicketSchema = new mongoose.Schema({
  issue_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  },
  linked_issue_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket',
  },
  link_type: {
    type: String,
    required: true,
  },
});

const LinkedTicket = mongoose.model('LinkedTicket', linkedTicketSchema);

module.exports = LinkedTicket;
