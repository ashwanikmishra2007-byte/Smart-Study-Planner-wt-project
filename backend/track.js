import db from "./db.js";
import trackTable from "./tracktable.js";
import express from "express";

const router = express.Router();

async function trackgr(){
    await trackTable();
    try{
        const sql=`SELECT 
        subjectname,
        COUNT(*) as totaltopics,
        SUM(completed) as completedtopics
        FROM progress
        GROUP BY subjectname`;
        const [result]= await db.query(sql);
        console.log(result);
        return result;
    } catch(err){
        console.log(err.message);
        throw err;
    }
}

router.get("/track/progress", async (req,res)=>{
    try {
        let result = await trackgr();
        return res.status(200).json(result);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Failed to fetch update data" });
    }
});

export default router;