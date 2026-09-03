import express, { Router } from "express";
import createTable from "./table.js";
import db from "./db.js"

const router=express.Router();

async function getsubjects(){
    await createTable(); // a function to be executed
    try{
        let query='SELECT * FROM subject ORDER BY priority desc';
        const [result]=await db.query(query);
        console.log(result);
        return result;
    } catch(err){
        console.log(err.message);
        return err.message;
    }
}

router.get("/view", async(req,res)=>{
    try{
        let result=await getsubjects();
        res.status(200).json(result);
    } catch(err){
        res.json({message:err.message})
    }
})

export default router;


getsubjects();