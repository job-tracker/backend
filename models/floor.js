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
  return db('floors').select(
    'id',
    'jobsite_id',
    'building_id',
    'name',
    'unit_count',
    'outlet_count',
    'notes',
    'complete'
  );
}

function findBy(filter) {
  return db('floors').where(filter);
}

async function add(floor) {
  const [id] = await db('floors').insert(floor).returning('id');

  return findById(id);
}

function findById(id) {
  return db('floors')
    .select(
      'id',
      'jobsite_id',
      'building_id',
      'name',
      'unit_count',
      'outlet_count',
      'notes',
      'complete'
    )
    .where({ id })
    .first();
}

async function remove(id) {
  try {
    deletedFloor = await findById(id);
    const getFloor = await db('floors').where({ id }).del();
    return getFloor ? getFloor : null;
  } catch {
    throw new Error(err);
  }
}

async function update(floor, id) {
  try {
    const updateFloor = await db('floors').where({ id }).update(floor);
    return updateFloor;
  } catch (err) {
    throw new Error(err);
  }
}
