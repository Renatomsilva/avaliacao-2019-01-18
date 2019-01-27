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
      'Error entering driver',
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
      'Error entering driver',
      `${err}`
    );
  }
}

const getDriverById = async ({driver_id}) => {
  const params = [driver_id];
  const query = `SELECT * FROM drivers WHERE id = ?`;

  try {
    const rows = await pool.query(query, params);
    return rows;
  } catch (err) {

    throw new APIError(
      409,
      'Error while searching truck driver',
      `${err.sqlMessage}${process.env.DB_HOST}`
    );
  }
}

module.exports = {
  createDriver,
  updateDriver,
  getDriverById
}
