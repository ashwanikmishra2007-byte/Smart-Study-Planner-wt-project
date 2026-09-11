import db from "./db.js";
import express from "express";
import cors from "cors";
import trackTable from "./tracktable.js";

const router=express.Router();

async function gettopic(subjectname){
    try{
        const query=`SELECT * FROM progress WHERE subjectname=?`;
        const [result] = await db.query(query, [subjectname]);
        console.log(result);
        return result;
    } catch(err){
        console.log(err.message);
        throw err;
    }
}

router.get("/track", async(req, res)=>{
    try{
        const { subjectname } = req.query;

        if (!subjectname) {
            return res.status(400).json({
                message: "Subject name is required"
            });
        }
        let result = await gettopic(subjectname);
        console.log(result);
        return res.status(200).json(result);

    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            message: err.message
        });
    }
})

export default router;