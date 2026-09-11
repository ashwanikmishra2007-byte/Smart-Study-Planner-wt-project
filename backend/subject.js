import express from "express";
import cors from "cors";
import table from "./table.js";
import db from "./db.js";

const router = express.Router();

async function addsubject(subjectname,subjectcode,subjectcredit,subjectsemester,priority){
    try {
        await table(); //a function to be execute
        let query=`INSERT INTO subject (subjectname,subjectcode,subjectcredit,subjectsemester,priority) values(?,?,?,?,?)`;
        const [result]=await db.query(query,[subjectname,subjectcode,subjectcredit,subjectsemester,priority]);
        console.log(result);
        return result;
    } catch(err){
        console.log(err.message);
        return err.message;
    }
}

router.post("/subject",async(req,res)=>{
    try {
        const {subjectname,subjectcode,subjectcredit,subjectsemester,priority}=req.body;
        if(!subjectname || !subjectcode || !subjectcredit || !subjectsemester || !priority ){
            return res.status(400).json({message:`These fields are required`});
        } else {
            let result = await addsubject(subjectname,subjectcode,subjectcredit,subjectsemester,priority);
            console.log("Insertion result:", result);
            return res.status(200).json({message:`Insertion complete`});
        }
    } catch(err) {
        return res.json({message:err.message});
        console.log(err.message);
    }
})

export default router;