import express from "express";
import db from "./db.js";
import table from "./table.js";

const router=express.Router();

async function updateget() {
    await table();
    try {
        let query = `select subjectname, priority from subject`;
        const [result] = await db.query(query);
        console.log(result);
        return result;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

router.get("/update", async (req, res) => {
    try {
        let result = await updateget();
        return res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Failed to fetch update data" });
    }
});

export default router;