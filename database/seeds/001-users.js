exports.seed = function (knex) {
  return knex('users').insert([
    {
      user_id: 1001,
      name: 'Dan Sample',
      email: 'danssample@gmail.com',
      password: 'password',
    },
    {
      user_id: 1002,
      name: 'Ricky Rick',
      email: 'rickyrick@gmail.com',
      password: 'password',
    },
  ]);
};
