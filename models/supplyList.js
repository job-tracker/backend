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
  return db('supply_lists').select('id', 'user_id', 'title', 'quantity');
}

function findBy(filter) {
  return db('supply_lists').where(filter);
}

async function add(supply_list) {
  const [id] = await db('supply_lists').insert(supply_list).returning('id');

  return findById(id);
}

function findById(id) {
  return db('supply_lists')
    .select('id', 'user_id', 'title', 'quantity')
    .where({ id })
    .first();
}

async function remove(id) {
  try {
    deletedSupplyList = await findById(id);
    const getSupplyList = await db('supply_lists').where({ id }).del();
    return getSupplyList ? getSupplyList : null;
  } catch {
    throw new Error(err);
  }
}

async function update(supply_list, id) {
  try {
    const updateSupplyList = await db('supply_lists')
      .where({ id })
      .update(supply_list);
    return updateSupplyList;
  } catch (err) {
    throw new Error(err);
  }
}
