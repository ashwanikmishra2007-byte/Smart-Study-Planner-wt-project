import db from "./db.js";

async function trackTable() {
    try {  //Creatin table for track progress of subjects and topics
        await db.query(`  
            CREATE TABLE IF NOT EXISTS progress (
                topicid INT AUTO_INCREMENT PRIMARY KEY,
                subjectname VARCHAR(100),
                topicname VARCHAR(200),
                completed BOOLEAN DEFAULT FALSE
            )
        `);
        console.log("Table created successfully");
    } catch (error) {
        console.error("Error creating table:", error);
    }
}

export default trackTable;