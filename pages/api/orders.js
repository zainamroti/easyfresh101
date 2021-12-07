import connectToDatabase from "../../lib/db"
var format = require('pg-format');


export default async function handler(req, res) {
    const { pool } = connectToDatabase();
    var query;
    try {

        switch (req.method) {

            case 'POST':

                // console.log("POST Body: ", req.body);
                const { customerName, orderTaker, customerAddress, delivery_date, totalPrice, ...tabledata } = req.body;

                query = {
                    text: 'INSERT INTO orders(created_at, customer_name, delivery_address, order_taker_name, delivery_date, total_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;',
                    values: [new Date().toISOString(), customerName, customerAddress, orderTaker, delivery_date, totalPrice],
                }

                await pool.query(query).then(async reslt => {
                    // console.log("Nested Query Parent Result: ", reslt.rows[0].id);

                    const asArray = Object.entries(tabledata);
                    // console.log("Nested Query asArray: ", asArray);

                    const values = asArray.map((row) => {
                        return row[1]  //To return internal object and not include string index. of the row
                    }).map(item => {
                        return [
                            reslt.rows[0].id,
                            item.name,
                            item.unit,
                            item.price,
                            item.quantity,
                            item.total,
                        ]
                    });
                    // console.log("Nested Query Filtered vals: ", values);

                    query = {
                        text: format('INSERT INTO order_items(order_id, product_name, product_unit, product_unit_price, quantity, total) VALUES %L;', values),
                    }

                    await pool.query(query).then(reslt => {
                        res.status(200).send({ "status": 200, "message": "Order Successful" });

                    }).catch(e => {
                        console.error(e.stack)
                        res.status(500).send({ "error": "PG DB Nexted Query Error" });
                    })

                    // res.status(200).send({ "status": 200, "message": "Post Successful", "result": values });

                }).catch(e => {
                    console.error(e.stack)
                    res.status(500).send({ "error": "PG DB Query Error" });
                })

                break;

            default: // GET
                query = {
                    text: 'SELECT * FROM ORDERS',
                }

                await pool.query(query).then(reslt => {
                    console.log(reslt.rows[0])
                    // rowData = ;
                    res.status(200).send({ "status": 200, "message": "Fetch Successful", "result": reslt.rows });

                }).catch(e => {
                    console.error(e.stack)
                    res.status(500).send({ "error": "PG DB Query Error" });
                })

        }



        // res.end();
    } catch (e) {
        console.error(e);
        res.status(500).send({ "error": "PG DB Query Error" });
    }
};
