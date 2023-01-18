const fs = require('fs/promises');
const path = require('path');

const CODEPAGE = 'utf8';

const contactsDB = 'contacts.json';
const contactsPath = path.join(__dirname, 'db', contactsDB);

// TODO: задокументировать каждую функцию
/**
 * Получаем массив контактов
 *
 * @param - ничего не принимает в качастве параметра
 * @returns {Array} - возвращает массив контактов
 * @example
 *
 * listContacts();
 *  => [{ 'id': '2',
 * 'name': 'Chaim Lewis',
 * 'email': 'dui.in@egetlacus.ca',
 * 'phone': '(294) 840-6685'},
 * ...{...}]
 */
async function listContacts() {
  // ...твой код
  const data = await handleFileRead(contactsPath);
  return data;
}

/**
 * Получаем объект контакта по ID
 *
 * @param {number|string} contactId - принимает ID в виде строки или числа
 * @returns {Object} - возвращает контакт
 */
async function getContactById(contactId) {
  // ...твой код
  const newConactID =
    typeof contactId === 'number' ? contactId.toString : contactId;
  const data = await handleFileRead(contactsPath);
  return data.filter(e => e.id === newConactID);
}

/**
 * Удаляет контакт по ID
 *
 * @param {string|number} contactId - принимает ID в виде строки или числа
 * @returns {Object} - возвращает удаленный объект
 */
async function removeContact(contactId) {
  // ...твой код
  let removedContact = null;
  const data = await listContacts();
  const newData = data.filter(e => {
    if (e.id === contactId) {
      removedContact = e;
      return false;
    }
    return true;
  });
  await handleFileWrite(contactsPath, newData);
  return removedContact;
}
/**
 * Добавляет контакт
 *
 * @param {string} name - Имя
 * @param {string} email - Почта
 * @param {string} phone - телефон
 * @returns {Object } - возвращает созданный объект
 */
async function addContact(name, email, phone) {
  // ...твой код
  const data = await listContacts();
  const lastIndex = data.length - 1;
  const lastID = Number(data[lastIndex].id);
  const nextID = (lastID + 1).toString();

  const indexAdded =
    data.push({
      id: nextID,
      name: name,
      email: email,
      phone: phone,
    }) - 1;
  const addedID = data[indexAdded].id;
  await handleFileWrite(contactsPath, data);
  return await getContactById(addedID);
}
/**
 * Функция асинхронного чтения из файла
 *
 * @param {string} filePath - принимает путь с именем файла
 * @returns {Object} - возвращает объект, считанный из файла
 */
const handleFileRead = async filePath => {
  let result = null;
  try {
    const data = await fs.readFile(filePath, CODEPAGE);
    result = await JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
  return result;
};

/**
 * Фенкция асинхронной записи в файл
 *
 * @param {string} filePath - принимает путь с именем файла
 * @param {Array} data  - массив обїектов контактов
 * @returns
 */
const handleFileWrite = async (filePath, data) => {
  try {
    const dataOut = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, dataOut, CODEPAGE);
  } catch (error) {
    console.log(error.message);
  }
  return;
};

module.exports = { listContacts, getContactById, removeContact, addContact };

// handleFileWrite
// listContacts().then(console.log);
// getContactById('2').then(console.log);
// removeContact('2');
// addContact('a', 'b', 'c');
