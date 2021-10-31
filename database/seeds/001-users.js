exports.seed = function (knex) {
  return knex('users').insert([
    {
      user_id: 1001,
      name: 'Dan Sample',
      email: 'danssample@gmail.com',
    },
    {
      user_id: 1002,
      name: 'Ricky Rick',
      email: 'rickyrick@gmail.com',
    },
  ]);
};
