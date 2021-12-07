import connectToDatabase from "../../lib/db"


export default async function handler(req, res) {
    const { pool } = connectToDatabase();
    try {
        const query = {
            // give the query a unique name
            // name: 'fetch-order-items',
            text: 'SELECT * FROM PRODUCTS',
        }

        await pool.query(query).then(reslt => {
            // console.log(reslt.rows[0])
            res.status(200).send({ "status": 200, "message": "Fetch Successful", "result": reslt.rows });

        }).catch(e => {
            console.error(e.stack)
            res.status(500).send({ "status": 404, "message": "Not Found"});
        })
        // res.end();
    } catch (e) {
        console.error(e);
        res.status(500).send({ "status": 404, "message": "Not Found"});
    }
};
