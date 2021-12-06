// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDatabase from "../../lib/db"



// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }



export default async function handler(req, res) {
  const { pool } = connectToDatabase();
  try {
    (await pool.query("SELECT NOW()", (err, res) => {

      if (err) {
        console.log(err, res)
      } else {
        console.log("Postgres-Pool Connection Successful.");

      }
      // pool.end()
    }));
    res.end(`Time Response: }`);
  } catch (e) {
    console.error(e);
    res.status(500).end("PG Connection Error");
  }
};
