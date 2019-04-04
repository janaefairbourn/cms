// var express = require('express');
// var router = express.Router();
// var sequenceGenerator = require('./sequenceGenerator');

// const Contact = require('../models/contact');

// function returnError(res, error) {
//     res.status(500).json({
//         message: 'An error has occurrecd',
//         error: error
//     });
// }

// // revisit
// router.get('/', (res) => {
//     Contact.find()
//         .populate('group')
//         .exec(function (err, contacts) {
//             if (err) {
//                 return res.status(500).json({
//                     title: 'An error has occurred',
//                     error: err
//                 });
//             }
//             res.status(200).json({
//                 contact: 'Success',
//                 obj: contacts
//             });
//         })
// });

// router.post('/', (req, res, next) => {
//     const maxMessageId = sequenceGenerator.nextId("contacts");

//     const contact = new Contact({
//         id: maxMessageId,
//         name: req.body.name,
//         description: req.body.description,
//         url: req.body.url
//     });

//     contact.save()
//         .then(createdMessage => {
//             res.status(201).json({
//                 message: 'Contact added successfully',
//                 messageId: createdMessage.id
//             });
//         })
//         .catch(error => {
//             returnError(res, error);
//         });
// });

// router.put('/:id', (req, res, next) => {
//     Contact.findOne({ id: req.params.id })
//         .then(contacts => {
//             contacts.name = req.body.name;
//             contacts.description = req.body.description;
//             contacts.url = req.body.url;

//             Contact.updateOne({ id: req.params.id}, contacts)
//                 .then(result => {
//                     res.status(204).json({
//                         contacts: 'Contact updated successfully'})
//                     })
//                     .catch(error => {
//                         returnError(res, error);
//                     });
//                 })
//                 .catch(error => {
//                     res.status(500).json({
//                         contacts: 'Contact not found.',
//                         error: { contacts: 'Contact not found'}
//                     });
//                 });
// });

// router.delete("/:id", (req, res, next) => {
//     Contact.findOne({ id: req.params.id })
//         .then(contacts => {
//             Contact.deleteOne({ id: req.params.id })
//                 .then(result => {
//                     res.status(204).json({message: "Contact deleted successfully" });
//                 })
//                 .catch(error => {
//                     returnError(res, error);
//                 });
//         })
//         .catch(error => {
//             returnError(res, error);
//         });
// });

// module.exports = router;