// var colors = require('colors');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contcts');

const { Command } = require('commander');
const program = new Command();

const c = {
  def: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  white: '\x1b[37m',
};
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.log(await listContacts());
      break;

    case 'get':
      console.log(await getContactById(id));
      break;

    case 'add':
      const res = await addContact(name, email, phone);
      console.log(res);
      break;

    case 'remove':
      console.log(await removeContact(id));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!\x1b[0m');
  }
}

invokeAction(argv);
