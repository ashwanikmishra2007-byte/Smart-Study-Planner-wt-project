import express from "express";
import cors from "cors";
import db from "./db.js";
import createTable from "./table.js";
import router from "./subject.js";

const app=express();
const PORT=3000;

app.use(express.json());
app.use(cors());
app.use(router);

async function startserver () {
    try {
        await createTable();
        console.log("Table created successfully");

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });

    } catch (err) {
        console.log("SERVER STARTUP ERROR:");
        console.log(err);
    }
}

startserver();