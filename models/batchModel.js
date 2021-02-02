const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A Batch Must have a title'],
        minlength:4,
        maxlength:80,
        unique: true
    },
    description: {
        type: String,
        minlength:15,
        maxlength:600
    },
    maxNumberOfStudents: {
        type: Number,
        required: [true, 'please provide maxNumberOfStudents'],
        min: 1,
        max: 50
    } ,
    type: {
        type: String,
        enum: ['YOGA' , 'PIKATES', 'CARDIO'],
        required: [true, 'please provide a specific type']
    },
    start: Date,
    end: Date
});

const Batch = mongoose.model('Batch', batchSchema);

module.exports = Batch;