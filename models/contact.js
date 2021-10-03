const db = require('../database/config');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update,
};

function find() {
  return db('contacts').select(
    'id',
    'user_id',
    'jobsite_id',
    'job_title',
    'name',
    'phone_number'
  );
}

function findBy(filter) {
  return db('contacts').where(filter);
}

async function add(contact) {
  const [id] = await db('contacts').insert(contact).returning('id');

  return findById(id);
}

function findById(id) {
  return db('contacts')
    .select('id', 'user_id', 'jobsite_id', 'job_title', 'name', 'phone_number')
    .where({ id })
    .first();
}

async function remove(id) {
  try {
    deletedContact = await findById(id);
    const getContact = await db('contacts').where({ id }).del();
    return getContact ? getContact : null;
  } catch {
    throw new Error(err);
  }
}

async function update(contact, id) {
  try {
    const updateContact = await db('contacts').where({ id }).update(contact);
    return updateContact;
  } catch (err) {
    throw new Error(err);
  }
}
