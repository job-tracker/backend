exports.seed = function (knex) {
  return knex('contacts').insert([
    {
      user_id: 1001,
      jobsite_id: 1,
      job_title: 'Job Supervisor',
      name: 'Rick Jones',
      phone_number: '123-555-2323',
    },
    {
      user_id: 1002,
      jobsite_id: 2,
      job_title: 'Head Electrician',
      name: 'Devin Thompson',
      phone_number: '123-555-4466',
    },
  ]);
};
