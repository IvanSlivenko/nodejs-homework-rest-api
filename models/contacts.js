const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require('nanoid');

const booksPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(booksPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  // отримуємо всі контакти
  const contactsList = await listContacts();
  // шукаємо контакт з потрібниь id
  const result = contactsList.find((item) => item.id === contactId);
  // повертаємо результат
  return result || null;
}

const removeContact = async (contactId) => {
  // отримуємо всі контакти
  const contactsList = await listContacts();

  // шукаємо книгу з потрібниь id
  const index = contactsList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  // Видаляємо книгу
  const [result] = contactsList.splice(index, 1);

  // Перезаписуємо JSON
  await fs.writeFile(booksPath, JSON.stringify(contactsList, null, 2));

  // повертаємо результат
  return result;
}

const addContact = async (body) => {
  // cтворюємо новий контакт
  const newContact = {
    id: nanoid(),
    ...body,
  };
  // отримує всі контакти,що були
  const contactsList = await listContacts();

  // додаємо до всіх контактів,що були новий контакт
  contactsList.push(newContact);

  // Перезаписуємо JSON
  await fs.writeFile(booksPath, JSON.stringify(contactsList, null, 2));
  // повертаємо результат
  return newContact;
}

const updateContact = async (contactId, body) => {
  // отримуємо всі контакти
  const contactsList = await listContacts();

  // шукаємо контакт з потрібним id
  const index = contactsList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contactsList[index] = { contactId, ...body };
  // Перезаписуємо JSON
  await fs.writeFile(booksPath, JSON.stringify(contactsList, null, 2));
  // повертаємо результат
  return contactsList[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
