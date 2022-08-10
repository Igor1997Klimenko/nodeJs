const fs = require('fs/promises');
const path = require('path');
const {uid} = require('uid');

const contactsPath = path.resolve(__dirname, './db/contacts.json');

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}
  
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const results = contacts.find(({id}) => id === contactId);
  return results || null;
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: uid(),
    name,
    email,
    phone,
}
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  }
  
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idxContact = contacts.findIndex(({id}) => id === contactId);
  if(idxContact === -1){
      return null;
  }
const [results] = contacts.splice(idxContact, 1);
  await updateContacts(contacts);
  return results;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}