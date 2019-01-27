const pool = require('../config/mysql/db-context');
const {
	APIError
} = require('../helpers');

const createTruck = async ({
	type,
	is_own,
	tag,
}, {
	id
}) => {
	const params = [type, is_own, tag, id];
	const query = `INSERT INTO drivers_trucks (id_truck_type, own_truck, tag, id_driver) VALUES (?, ?, ?, ?)`;

	try {
		const rows = await pool.query(query, params);
		return {
			id: rows.insertId,
			type,
			is_own,
			tag,
			driver_id: id
		};
	} catch (err) {
		throw new APIError(
			409,
			'Error inserting truck into driver',
			`${err.sqlMessage}`
		);
	}
}

const getTruckDriverIsOwn = async ({
	is_own
}) => {
	const params = [is_own];
	const query = `SELECT 
   d.name
	FROM  drivers_trucks AS dt 
	JOIN drivers AS d 
		ON d.id = dt.id_driver
  WHERE 
    dt.own_truck = ? 
  ORDER BY 1 ASC`;
	try {
		const rows = await pool.query(query, params);
		return rows || undefined;
	} catch (err) {
		throw new APIError(
			409,
			'Error while returning drivers',
			`${err.sqlMessage}`
		);
	}
}

const getTrucksLoadByFilter = async ({
	start_day,
	end_day
}) => {
	if (!end_day)
		end_day = start_day;
	const params = [start_day, end_day];
	const query = `SELECT 
		count(*) as count_trucks
	FROM route AS r 
	JOIN route_in_out as ri 
		ON ri.id_route = r.id AND ri.type = 'IN'
	JOIN drivers_trucks AS dt 
		ON dt.id = r.id_drivers_trucks
	JOIN drivers AS d 
		ON d.id = dt.id_driver
	WHERE 
		ri.is_load = 1 AND 
		date(ri.created) BETWEEN ? AND ?
	ORDER BY 1 DESC`;
	try {
		const rows = await pool.query(query, params);
		return rows[0] || undefined;
	} catch (err) {
		throw new APIError(
			409,
			'Error while returning drivers',
			`${err.sqlMessage}`
		);
	}
}

module.exports = {
	createTruck,
	getTruckDriverIsOwn,
	getTrucksLoadByFilter
}