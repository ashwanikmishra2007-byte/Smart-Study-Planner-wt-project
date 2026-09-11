import db from "./db.js";
import express from "express";
import cors from "cors";
import trackTable from "./tracktable.js";

const router= express.Router();

async function addtopics(subjectname, topicname, completed){
    await trackTable();
    try {
        const query=`INSERT INTO progress (subjectname, topicname, completed) values(?,?,?)`;
        const [result]= await db.query(query,[subjectname,topicname,completed]);
        console.log(result);
        return result;
    } catch(err){
        console.log(err.message);
        throw err;
    }
}

router.post("/track", async(req, res)=>{
    try{
        const {subjectname,topicname,completed}=req.body;
        if(!subjectname || !topicname || completed==undefined){
            return res.status(400).json({message: `These fields are required`});
        } else {
            let result = await addtopics(subjectname,topicname,completed);
            console.log(result);
            return res.status(200).json({message:`Insertion complete`});
        }
    } catch(err){
        return res.status(404).json({message: err.message});
        console.log(err.message);
    }
})

export default router;