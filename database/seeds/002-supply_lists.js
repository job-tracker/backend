exports.seed = function (knex) {
  return knex('supply_lists').insert([
    {
      user_id: 1001,
      title: '4way splitters',
      quantity: '4 boxes',
    },
    {
      user_id: 1002,
      title: '2way splitters',
      quantity: '6 boxes',
    },
  ]);
};
