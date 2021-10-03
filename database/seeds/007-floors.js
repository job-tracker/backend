exports.seed = function (knex) {
  return knex('floors').insert([
    {
      user_id: 1001,
      jobsite_id: 1,
      building_id: 1,
      name: '1',
      scope_of_work: '6 units this floor',
      complete: false,
    },
    {
      user_id: 1001,
      jobsite_id: 1,
      building_id: 2,
      name: '2',
      scope_of_work: '20 units this floor',
      complete: false,
    },
    {
      user_id: 1002,
      jobsite_id: 2,
      building_id: 3,
      name: '1',
      scope_of_work: '18 units this floor',
      complete: false,
    },
    {
      user_id: 1002,
      jobsite_id: 2,
      building_id: 4,
      name: '2',
      scope_of_work: '12 units this floor',
      complete: false,
    },
  ]);
};
