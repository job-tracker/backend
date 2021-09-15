exports.seed = function (knex) {
  return knex('buildings').insert([
    {
      user_id: 1001,
      jobsite_id: 1,
      address: 'A',
      scope_of_work: 'finish before 10/26/21',
      complete: false,
    },
    {
      user_id: 1001,
      jobsite_id: 1,
      address: 'B',
      scope_of_work: 'Ready in 3 weeks',
      complete: false,
    },
    {
      user_id: 1002,
      jobsite_id: 2,
      address: '17645',
      scope_of_work: 'finish before 10/14/21',
      complete: false,
    },
    {
      user_id: 1002,
      jobsite_id: 2,
      address: '54671',
      scope_of_work: 'Ready in 2 weeks',
      complete: false,
    },
  ]);
};
