import express from "express";
import trackTable from "./tracktable.js";
import createTable from "./table.js";
import db from "./db.js";

const router = express.Router();

async function deletesubject(subjectname) {
    try {
        await trackTable();
        await createTable();
        const [progressResult] = await db.query("DELETE FROM progress WHERE subjectname = ?", [subjectname]);
        const [subjectResult] = await db.query("DELETE FROM subject WHERE subjectname = ?", [subjectname]);
        console.log(progressResult, subjectResult);
        return { progress: progressResult, subject: subjectResult };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

router.delete("/delete", async (req, res) => {
    try {
        const { subjectname } = req.body;

        if (!subjectname) {
            return res.status(400).json({ message: "Subject is required" });
        }

        const result = await deletesubject(subjectname);
        console.log("Deletion result:", result);
        return res.status(200).json({ message: "Deletion complete" });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
});

export default router;