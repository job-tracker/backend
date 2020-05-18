exports.seed = function (knex) {
  return knex('tasks').insert([
    {
      jobsite_id: 1,
      due_date: '2020-08-25',
      title: 'Deadline',
      task: 'Complete building G, keys will be turned over the first of sept.',
      complete: false,
    },
  ]);
};
