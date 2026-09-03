import express from "express";
import db from "./db.js";
import table from "./table.js";

const router=express.Router();

async function updateput(subjectname,priority){
    await table();
    try{
        let query = `UPDATE subject SET priority=? WHERE subjectname=?`
        const [result] = await db.query(query,[priority,subjectname]);
        console.log(result);
        return result;
    }catch(err){
        console.log(err);
        throw err;
    }
}

router.put("/update", async(req,res)=>{
    const {subjectname,priority}=req.body;
    try{
        if(!subjectname || priority==undefined){
            return res.json({message:"Incomplete field"});
        }else {
            let result=await updateput(subjectname,priority);
            console.log(result);
            return res.status(200).json({message:"Priority updated"});
        }
    } catch(err) {
        return res.status(500).json({message:"Updation incomplete"});
    }
})

export default router;