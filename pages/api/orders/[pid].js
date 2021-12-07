import connectToDatabase from "../../../lib/db"

export default async function handler(req, res) {
    const { pool } = connectToDatabase();
    console.log("POST Body: ", req.query.pid);
    try {
        const query = {
            // give the query a unique name
            // name: 'fetch-order-items',
            text: 'SELECT * FROM ORDER_ITEMS WHERE order_id = $1',
            values: [req.query.pid],
        }

        await pool.query(query).then(reslt => {
            // console.log(reslt.rows[0])
            res.status(200).send({ "status": 200, "message": "ORDER Fetch Successful", "result": reslt.rows });

        }).catch(e => {
            console.error(e.stack)
            res.status(500).send({ "error": "PG DB Query Error" });
        })
        // res.end();
    } catch (e) {
        console.error(e);
        res.status(500).send({ "error": "PG DB Query Error" });
    }
};
