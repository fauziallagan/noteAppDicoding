const {
    addNoteHandler
} = require('./handler');

const notes = [{
        method: 'POST',
        path: './notes',
        handler: addNoteHandler,
        option: {
            cors: {
                origin: ['*'],
            },
        },
    },

];

module.exports = notes;