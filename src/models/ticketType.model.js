const mongoose = require('mongoose');
const { defaultTickets } = require('../config/project');

const ticketTypeSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    ticket_type: [
        {
            name: {
                type: String,
                required: true
            },
            theme: {
                bg: {
                    type: String,
                    required: true
                },
                text: {
                    type: String,
                    required: true
                }
            }
        }
    ]
});

ticketTypeSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.ticket_type = defaultTickets;
    }
    next();
});

const TicketType = mongoose.model('TicketType', ticketTypeSchema);

module.exports = TicketType;
