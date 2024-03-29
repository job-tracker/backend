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
  return db('units').select(
    'id',
    'user_id',
    'jobsite_id',
    'building_id',
    'floor_id',
    'name',
    'scope_of_work',
    'complete'
  );
}

function findBy(filter) {
  return db('units').where(filter);
}

async function add(unit) {
  const [id] = await db('units').insert(unit).returning('id');

  return findById(id);
}

function findById(id) {
  return db('units')
    .select(
      'id',
      'user_id',
      'jobsite_id',
      'building_id',
      'floor_id',
      'name',
      'scope_of_work',
      'complete'
    )
    .where({ id })
    .first();
}

async function remove(id, userId) {
  try {
    const getUnit = await db('units').where({ id: id, user_id: userId }).del();
    return getUnit ? getUnit : null;
  } catch {
    throw new Error(err);
  }
}

async function update(unit, id) {
  try {
    const updateUnit = await db('units').where({ id }).update(unit);
    return updateUnit;
  } catch (err) {
    throw new Error(err);
  }
}
