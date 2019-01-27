const pool = require('../config/mysql/db-context');
const { APIError } = require('../helpers');

const getTruckTypeByCode = async ({type}) => {
	const params = [type];
	const query = `SELECT * FROM truck_type WHERE code = ?`;

	try {
		const rows = await pool.query(query, params);
		return rows;
	} catch (err) {
		throw new APIError(
			409,
			'Error inserting truck into driver',
			`${err.sqlMessage}`
		);
	}
}

module.exports = {
	getTruckTypeByCode
}
