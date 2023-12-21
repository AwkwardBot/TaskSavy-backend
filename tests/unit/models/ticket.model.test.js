const faker = require('faker');
const mongoose = require('mongoose');
const { Ticket } = require('../../../src/models')

describe('Ticket validation', () => {
  let newTicket;
  beforeEach(() => {
    newTicket = {
      title: 'Sample Ticket',
      description: 'Sample description',
      due_date: new Date(),
    };
  });
  test('should correctly validate a valid ticket', async () => {
    await expect(new Ticket(newTicket).validate()).resolves.toBeUndefined();
  });

  test('should throw a validation error if title is missing', async () => {
    delete newTicket.title; 

    const ticket = new Ticket(newTicket);
    await expect(ticket.validate()).rejects.toThrow();
  });

  test('should set default status to "Pending"', () => {
    const ticket = new Ticket(newTicket);
    expect(ticket.status).toBe('Pending');
  });

  test('should set default priority to "Normal"', () => {
    const ticket = new Ticket(newTicket);
    expect(ticket.priority).toBe('Normal');
  });

  test('should set default URL to "none" on creation', () => {
    const ticket = new Ticket(newTicket);
    expect(ticket.url).toBeUndefined();
  });
});

