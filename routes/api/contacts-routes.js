const express = require('express')

const contactsService = require("../../models/contacts");

const router = express.Router()
// маршрут get "/"
router.get('/', async (req, res, next) => {
  const result = await contactsService.listContacts(); 
  res.json(result);
})

// маршрут get  "/:contactId"
router.get('/:contactId', async (req, res, next) => {
  const contact = await contactsService.getContactById()
  res.json(contact);
})

router.post('/', async (req, res, next) => {
  const newContact = await contactsService.addContact() 
  res.json(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const removeContact = await contactsService.removeContact(); 
  res.json(removeContact);
})

// router.put('/:contactId', async (req, res, next) => {
  
//   res.json({ message: 'template message' })
// })

module.exports = router
