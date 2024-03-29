exports.seed = function (knex) {
  return knex('units').insert([
    {
      user_id: 1001,
      jobsite_id: 1,
      building_id: 1,
      floor_id: 1,
      name: '101',
      scope_of_work: '3 outlets',
      complete: true,
    },
    {
      user_id: 1001,
      jobsite_id: 1,
      building_id: 1,
      floor_id: 2,
      name: '202',
      scope_of_work: '3 outlets',
      complete: true,
    },
    {
      user_id: 1001,
      jobsite_id: 1,
      building_id: 2,
      floor_id: 1,
      name: '103',
      scope_of_work: '3 outlets',
      complete: false,
    },
    {
      user_id: 1001,
      jobsite_id: 1,
      building_id: 2,
      floor_id: 2,
      name: '206',
      scope_of_work: '3 outlets',
      complete: true,
    },
    {
      user_id: 1002,
      jobsite_id: 2,
      building_id: 3,
      floor_id: 3,
      name: '101',
      scope_of_work: '3 outlets',
      complete: true,
    },
    {
      user_id: 1001,
      jobsite_id: 1,
      building_id: 3,
      floor_id: 4,
      name: '202',
      scope_of_work: '3 outlets',
      complete: true,
    },
    {
      user_id: 1001,
      jobsite_id: 1,
      building_id: 4,
      floor_id: 1,
      name: '103',
      scope_of_work: '3 outlets',
      complete: false,
    },
    {
      user_id: 1001,
      jobsite_id: 1,
      building_id: 4,
      floor_id: 2,
      name: '206',
      scope_of_work: '3 outlets',
      complete: true,
    },
  ]);
};
