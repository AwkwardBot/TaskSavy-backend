const defaultBoards = [
    { name: 'Pending', description: 'Tasks yet to be scheduled', color: '#f87171'  },
    { name: 'Working', description: 'Tasks currently being worked on', color: '#818cf8' },
    { name: 'Completed', description: 'Tasks that are completed', color: '#4ade80' }
];

const defaultTags = [
    { name: 'Task'},
    { name: 'Issue' },
    { name: 'Bug' }
];


module.exports = {
    defaultBoards,
    defaultTags
}