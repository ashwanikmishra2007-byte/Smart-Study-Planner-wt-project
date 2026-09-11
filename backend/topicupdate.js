import db from "./db.js";
import trackTable from "./tracktable.js";
import express from "express";

const router=express.Router();

async function update(topicid, completed){
    await trackTable();
    try{
        const query=`UPDATE progress SET completed=? WHERE topicid=?`;
        const result = await db.query(query, [completed, topicid]);
        console.log(result);
        return result;
    } catch(err){
        console.log(err.message);
        throw err;
    }
}

router.put("/track", async(req, res)=>{
    try{
        const { topicid, completed } = req.body;

        if (topicid==undefined || completed==undefined) {
            return res.status(400).json({
                message: "Topic selection required"
            });
        }
        let [result] = await update(topicid, completed);
        console.log(result);
        return res.status(200).json({message:"Upadation completed"});

    } catch (err) {
        console.log(err.message);

        return res.status(500).json({
            message: err.message
        });
    }
})

export default router;