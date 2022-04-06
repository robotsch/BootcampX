const { Pool } = require('pg');

const pool = new Pool({database: 'bootcampx'})

const values = [`${process.argv[2] || 'JUL02'}`]

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
ORDER BY teacher;
`, values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${values[0]}: ${row.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));