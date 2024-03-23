const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rita1',
  password: 'rita',
  port: 5432,
})

const getTask = (request, response) => {
  pool.query('SELECT data FROM rel2  ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getTaskId = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM rel2 WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows);
  })
}

const createTask = (req, res) => {
  const { id, daughter } = req.body
  const name = req.body
  const keyN = Object.keys(name)[1]
  const data1 = { [keyN]: req.body }
  pool.query('INSERT INTO rel2 (data) VALUES ($1)',
    [data1], (error, results) => {
      if (error) {
        console.log('error--', error)
        throw error
      }
      res.status(201).send(results)
    })
}
const deleteTask = (req, res) => {
  const name = req.body
  const keyN = Object.keys(name)[1]
  const delete_name = name[keyN]
  pool.query(`UPDATE rel2
  SET data = data::jsonb #- '{${keyN},${keyN}}'::text[]
  WHERE data::text like '%${delete_name}%' `, (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(results)
  })
}

module.exports = {
  getTask,
  getTaskId,
  createTask,
  deleteTask,
}