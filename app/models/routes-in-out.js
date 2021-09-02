const pool = require('../config/mysql/db-context');
const { APIError } = require('../helpers');

const createCheckInOut = async ({ is_load, type, id_route }) => {
  const params = [ is_load, type, id_route ];
  const query = `INSERT INTO route_in_out
    (is_load,
    type,
    id_route)
  VALUES(?, ?, ?)`;

  try {
    const rows = await pool.query(query, params);
    return { id: rows.insertId, is_load, type, id_route };
  } catch (err) {
    throw new APIError(
      409,
      'Error entering route',
      `${err.sqlMessage}`
    );
  }
}

const getLastRouteCheckOut = async ({id_drivers_trucks}) => {
  const params = [id_drivers_trucks];
  const query = `SELECT 
    r.id AS id_route,
    r.origin AS origin, 
    r.destiny AS destiny, 
    ri.created AS checkin_date, 
    ri.is_load AS checkin_isload, 
    ro.created AS checkout_date, 
    ro.is_load AS checkout_isload
  FROM route AS r 
  JOIN route_in_out as ri 
    ON ri.id_route = r.id AND ri.type = 'IN'
  JOIN route_in_out as ro 
    ON ro.id_route = r.id AND ro.type = 'OUT'
  WHERE 
    id_drivers_trucks = ?  
  ORDER BY 1 DESC LIMIT 1`;
	try {
		const rows = await pool.query(query, params);
		return rows[0] || undefined;
	} catch (err) {
		throw new APIError(
			409,
			'Error inserting truck into driver',
			`${err.sqlMessage}`
		);
	}
}

const getRoutesByDriverIsLoad = async ({ is_load }) => {
  const params = [is_load, is_load];
  const query = `SELECT   
   d.name
  FROM route AS r 
  JOIN route_in_out as ri 
    ON ri.id_route = r.id AND ri.type = 'IN'
  JOIN route_in_out as ro 
    ON ro.id_route = r.id AND ro.type = 'OUT'
  JOIN drivers_trucks AS dt ON dt.id = r.id_drivers_trucks
  JOIN drivers AS d ON d.id = dt.id_driver
  WHERE 
    ri.is_load = ? OR ro.is_load = ?
  ORDER BY 1 ASC`;
	try {
		const rows = await pool.query(query, params);
		return rows;
	} catch (err) {
		throw new APIError(
			409,
			'Error while returning drivers',
			`${err.sqlMessage}`
		);
	}
}

module.exports = {
  createCheckInOut,
  getLastRouteCheckOut,
  getRoutesByDriverIsLoad
}
