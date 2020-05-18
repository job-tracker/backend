exports.seed = function (knex) {
  return knex('jobsites').insert([
    {
      tracking_number: 12345,
      name: 'Village by Vintage',
      address: '123 Jackson Ave Seattle, Wa',
      complete: false,
    },
  ]);
};
