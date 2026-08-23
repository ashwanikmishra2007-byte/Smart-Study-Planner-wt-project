import mysql from "mysql2/promise";

//Database connections
const db = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"ashwaniroot_2026",
    database: "smart_study_planner"
})

export default db;