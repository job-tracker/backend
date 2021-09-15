exports.seed = function (knex) {
  return knex('jobsites').insert([
    {
      user_id: 1001,
      tracking_number: 123456,
      name: 'Village by Vintage',
      address: '123 Jackson Ave Seattle, Wa',
      complete: false,
    },
    {
      user_id: 1002,
      tracking_number: 123478,
      name: 'The Town Homes',
      address: '17654 47th St Tacoma, Wa',
      complete: false,
    },
    {
      user_id: 1001,
      tracking_number: 123889,
      name: 'Caddyshack',
      address: '675 The Ave Seattle, Wa',
      complete: false,
    },
    {
      user_id: 1002,
      tracking_number: 123890,
      name: 'High Homes',
      address: '154 7th St Tacoma, Wa',
      complete: false,
    },
  ]);
};
