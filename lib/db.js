
const { Pool } = require("pg");


if (!global.db) {
    global.db = { pool: null };
}

export default function connectToDatabase() {

    var connectionString = '';

    if (process.env.NODE_ENV === 'production') {
        connectionString = process.env.DATABASE_URL_PROD;

    } else {  // Development  environment.
        connectionString = process.env.DATABASE_URL;
    } // also another local host env ??
    // connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.DB_NAME}`

    console.log("ENV PD: ", `${connectionString}`)

    if (!global.db.pool) {
        console.log("No pool available, creating new pool.");
        // global.db.pool = new Pool({
        //     host: process.env.DB_HOST,
        //     port: process.env.PORT_DEV,
        //     user: process.env.DB_USER,
        //     database: process.env.DB_NAME,
        //     password: process.env.DB_PASS,
        // });
        global.db.pool = new Pool({
            connectionString,
        });
    }

    //Trying this query to see Initial connection
    // global.db.pool.query('SELECT NOW()', (err, res) => {

    //     if (err) {
    //         console.log(err, res)
    //     } else {
    //         console.log("Posgres-Pool Connection Successful.");
    //     }
    //     // pool.end()
    // })
    return global.db;
}

