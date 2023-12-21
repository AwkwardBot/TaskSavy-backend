const faker = require('faker');
const mongoose = require('mongoose');
const { Project } = require('../../../src/models')

describe('Project validation', () => {
  let newProject;

  beforeEach(() => {
    newProject = {
      name: faker.company.companyName(),
      description: faker.lorem.sentence(),
      key: 'ABC',
      startDate: new Date(),
      endDate: new Date(),
      status: 'Pending',
      activeStatus: 'Active',
      boards: [
        {
          name: faker.random.word(),
          description: faker.lorem.sentence(),
          color: faker.internet.color(),
        },
      ],
      tags: [
        {
          name: faker.random.word(),
        },
      ],
      members: [
        {
          userId: mongoose.Types.ObjectId(),
          role: 'Admin',
        },
      ],
    };
  });

  test('should correctly validate a valid project', async () => {
    await expect(new Project(newProject).validate()).resolves.toBeUndefined();
  });

  test('should throw a validation error if key is invalid', async () => {
    newProject.key = 'AB'; 
    await expect(new Project(newProject).validate()).rejects.toThrow();
  });

  test('should throw a validation error if activeStatus is invalid', async () => {
    
    newProject.activeStatus = 'InvalidStatus'; 
    const project = new Project(newProject);
    await expect(project.validate()).rejects.toThrow();
  });


  test('should throw a validation error if status is invalid', async () => {
    
    newProject.status = 'InvalidStatus'; 
    const project = new Project(newProject);
    await expect(project.validate()).rejects.toThrow();
  });
  
});
