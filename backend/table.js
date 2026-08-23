import db from "./db.js";

export default async function createTable() {
    const q1 = await db.query(
        `CREATE TABLE IF NOT EXISTS subject (
            id INT AUTO_INCREMENT PRIMARY KEY,
            subjectname VARCHAR(100) NOT NULL,
            subjectcode VARCHAR(50) NOT NULL,
            subjectcredit INT NOT NULL,
            subjectsemester INT NOT NULL
        );`
    );
    return q1;
}

let q=await createTable();
console.log(q);