const { Command } = require("commander");
const contacts = require('./contacts');

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
        const allContacts = await contacts.listContacts();
        console.log(allContacts);
      break;

    case "get":
        const idContact = await contacts.getContactById(id);
        console.log(idContact);
      break;

    case "add":
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
      break;

    case "remove":
        const deleteContactId = await contacts.removeContact(id);
        console.log(deleteContactId);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

