const mongoose = require('mongoose');
const { TicketType } = require('../../../src/models');
const defaultTickets = require('../../../src/config/project')

describe('TicketType validation', () => {
  let newTicketType;

  beforeEach(() => {
    newTicketType = {
      projectId: mongoose.Types.ObjectId(), 
      ticket_type: [
        {
          name: 'Bug',
          theme: {
            bg: '#FF0000',
            text: '#FFFFFF',
          },
        },
        
      ],
    };
  });

  test('should correctly validate a valid ticket type', async () => {
    await expect(new TicketType(newTicketType).validate()).resolves.toBeUndefined();
  });

  test('should throw a validation error if projectId is missing', async () => {
    delete newTicketType.projectId; 

    const ticketType = new TicketType(newTicketType);
    await expect(ticketType.validate()).rejects.toThrow();
  }, 30000);

  test('should set default ticket types if not provided', () => {
    const ticketType = new TicketType({ projectId: mongoose.Types.ObjectId() }); 
    expect(ticketType.ticket_type).toEqual(defaultTickets);
  }, 30000);

  test('should invoke pre-save middleware to set default ticket types if isNew', async () => {
    const ticketType = new TicketType({ projectId: mongoose.Types.ObjectId() }, 30000);
    await ticketType.save();

    expect(ticketType.ticket_type).toEqual(defaultTickets);
  }, 30000);

 
});
