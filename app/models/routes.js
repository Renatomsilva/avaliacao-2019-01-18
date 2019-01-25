const pool = require('../config/mysql/db-context');
const { APIError } = require('../helpers');
const _ = require('lodash');

const createRoute = async ({ id_drivers_trucks, origin, destiny }) => {
  const params = [ id_drivers_trucks, origin, destiny];
  const query = `INSERT INTO route 
    (id_drivers_trucks, 
      origin, 
      destiny) 
      VALUES (?, ?, ?)`;

  try {
    const rows = await pool.query(query, params);
    return { id: rows.insertId, id_drivers_trucks, origin, destiny };
  } catch (err) {
    throw new APIError(
      409,
      'Erro ao inserir a rota',
      `${err.sqlMessage}`
    );
  }
}

const getRouteById = async ({id_route}) => {
	const params = [id_route];
  const query = `SELECT 
    r.id AS id_route,
    r.origin AS origin, 
    r.destiny AS destiny, 
    ri.created AS checkin_date, 
    ri.is_load AS checkin_isload, 
    ro.created AS checkout_date, 
    ro.is_load AS checkout_isload
  FROM route AS r 
  LEFT JOIN route_in_out as ri 
    ON ri.id_route = r.id AND ri.type = 'IN'
  LEFT JOIN route_in_out as ro 
    ON ro.id_route = r.id AND ro.type = 'OUT'
  WHERE 
    r.id = ?  
  ORDER BY 1 DESC LIMIT 1`;
	try {
		const rows = await pool.query(query, params);
		return rows[0] || undefined;
	} catch (err) {
		throw new APIError(
			409,
			'Erro ao inserir o caminhão ao motorista',
			`${err.sqlMessage}`
		);
	}
}

const getRouteByDriverTruck = async ({id_drivers_trucks}) => {
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
  LEFT JOIN route_in_out as ri 
    ON ri.id_route = r.id AND ri.type = 'IN'
  LEFT JOIN route_in_out as ro 
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
			'Erro ao inserir o caminhão ao motorista',
			`${err.sqlMessage}`
		);
	}
}

const getGroupRouteByType = async () => {
  const query = `SELECT 
      r.origin AS origin, 
      r.destiny AS destiny,
      tt.description AS truck_type
    FROM route AS r 
    LEFT JOIN drivers_trucks as dt 
      ON dt.id = r.id_drivers_trucks 
    LEFT JOIN truck_type as tt 
      ON tt.id = dt.id_truck_type 
    ORDER BY 1 DESC`;
	try {
    const rows = await pool.query(query);
    return _.mapValues(_.groupBy(rows, 'truck_type'),
    clist => clist.map(route => _.omit(route, 'truck_type')));
	} catch (err) {
		throw new APIError(
			409,
			'Erro ao pesquisar grupo de rotas',
			`${err.sqlMessage}`
		);
	}
}

module.exports = {
  createRoute,
  getRouteByDriverTruck,
  getRouteById,
  getGroupRouteByType
}
