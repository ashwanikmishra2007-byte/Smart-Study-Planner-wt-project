import jointable from "./union.js";
import express from "express";

const router = express.Router();

async function scheduler() {

    try{
        const data = await jointable();
        const scheduledata=data.filter(subject=> subject.completedTopics< subject.totalTopics).map(subject=>{
            const remainingtopics=subject.totalTopics-subject.completedTopics;

            const priorityscore = subject.priority/5;

            const topicscore=remainingtopics/subject.totalTopics;

            const score= (0.6*priorityscore)+(0.4*topicscore);
            return ({
                ...subject,
                remainingtopics,
                score
            })
        })
        scheduledata.sort((a,b)=>b.score-a.score);  //here if answer is negative a comes before b and if positive b before a
        console.log(scheduledata);
        return scheduledata;
    } catch(err){
        console.log(err.message);
        throw err;
    }

}

router.get("/schedule", async(req, res)=>{
    try{
        let result=await scheduler();
        res.status(200).json(result);
    } catch(err){
        res.json({message:err.message});
    }
})

export default router;