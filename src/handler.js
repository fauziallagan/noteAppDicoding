// import package nanoid
const {
    nanoid
} = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const {
        title,
        tags,
        body
    } = request.payload;
    const id = nanoid(16);
    const creatAt = new Date().toISOString();
    const updateAt = creatAt;

    const newNote = {
        title,
        tags,
        body,
        id,
        creatAt,
        updateAt
    };
    notes.push(newNote);
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'Success',
            message: 'Catatan Is Successfully',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'failed!',
        message: 'Catatan has been not created!',
    });
    response.code(500);
    return response;

};
const getAllHandler = () => ({
    status: 'Success',
    data: {
        notes,
    },
});
const getNoteByIdHandler = (request, h) => {
    const {
        id
    } = request.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'Success',
            data: {
                note,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan Tidak ditemuka',
    });
    response.code(404);
    return response;
};
const editNoteByIdHandler = (request, h) => {
    const {
        id
    } = request.params;
    const {
        title,
        tags,
        body
    } = request.payload;
    const updateAt = new Date().toISOString;
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Catatn berhasil diperbaharui',
        });
        response.code(200);
        return response;
    }
    const response = response.h({
        status: 'failed!',
        message: 'Gagal memperbaharui data',
    });
    response.code(404);
    return response
};

const deleteNoteByHandler = (request, h) => {
    const {
        id
    } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index !== -1) {
        notes.splice(index, -1);
        const response = h.response({
            status: 'success',
            message: 'catatan di hapus',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'catatan gagal',
    });
    response.code(404);
    return response;
};


module.exports = {
    addNoteHandler,
    getAllHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByHandler
};