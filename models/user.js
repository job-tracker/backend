const db = require('../database/config');

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  remove,
  update,
};

function find() {
  return db('users').select('id', 'user_id', 'name', 'email');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user).returning('id');

  return findById(id);
}

function findById(id) {
  return db('users')
    .select('id', 'user_id', 'name', 'email')
    .where({ id })
    .first();
}

function findByUserId(user_id) {
  return db('users')
    .select('id', 'user_id', 'name', 'email')
    .where({ user_id })
    .first();
}

async function remove(id) {
  try {
    deletedUser = await findById(id);
    const getUser = await db('users').where({ id }).del();
    return getUser ? getUser : null;
  } catch {
    throw new Error(err);
  }
}

async function update(user, userId) {
  try {
    const updateUser = await db('users')
      .where({ user_id: userId })
      .update(user);
    return updateUser;
  } catch (err) {
    throw new Error(err);
  }
}
