import connectToDatabase from "../../lib/db"


export default async function handler(req, res) {
    const { pool } = connectToDatabase();
    try {
        const query = {
            // give the query a unique name
            // name: 'fetch-order-items',
            text: 'SELECT * FROM ORDER_ITEMS',
            // text: 'SELECT * FROM ORDER_ITEMS WHERE id = $1',
            // values: [1],
        }

        await pool.query(query).then(reslt => {
            console.log(reslt.rows[0])
            // rowData = ;
            res.status(200).send({ "status": 200, "message": "Fetch Successful", "result": reslt.rows });

        }).catch(e => {
            console.error(e.stack)
            res.status(500).end("PG DB Query Error");
        })
        // res.end();
    } catch (e) {
        console.error(e);
        res.status(500).end("PG Connection Error");
    }
};
