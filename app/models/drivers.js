const pool = require('../config/mysql/db-context');
const { APIError } = require('../helpers');

const createDriver = async ({ name, license, gender, license_type }) => {
  const params = [name, license, gender, license_type];
  const query = `INSERT INTO drivers (name, license, gender, license_type) VALUES (?, ?, ?, ?)`;

  try {
    const rows = await pool.query(query, params);
    return { id: rows.insertId, name, license, gender, license_type };
  } catch (err) {
    throw new APIError(
      409,
      'Erro ao inserir motorista',
      `${err}`
    );
  }
}

const updateDriver = async ({ name, gender, license_type }, driver_id) => {
  const params = { name, gender, license_type, driver_id };
  const queryDynamic = [];

  Object.keys(params).forEach(key => {
    if (params[key] && key !== 'driver_id') {
      queryDynamic.push(`${key}='${params[key]}'`);
    }
  });
  queryDynamic.join(',');
  const query = `UPDATE drivers SET ${queryDynamic} WHERE id = ?`;

  try {
    const rows = await pool.query(query, [driver_id]);
    return { name, gender, license_type };
  } catch (err) {
    throw new APIError(
      409,
      'Erro ao inserir motorista',
      `${err}`
    );
  }
}

const getDriverById = async (id) => {
  const params = [id];
  const query = `SELECT * FROM drivers WHERE id = ?`;

  try {
    const rows = await pool.query(query, params);
    return rows;
  } catch (err) {

    throw new APIError(
      409,
      'Erro ao pesquisar caminhoneiro',
      `${err.sqlMessage}${process.env.DB_HOST}`
    );
  }
}

module.exports = {
  createDriver,
  updateDriver,
  getDriverById
}
