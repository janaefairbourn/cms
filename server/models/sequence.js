var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
    maxDocumentId: {type: Number, required: true},
    maxMessageId: {type: Number, required: true},
    maxContactId: {type: Number, required: true}
});

module.exports = mongoose.model('Sequence', schema);