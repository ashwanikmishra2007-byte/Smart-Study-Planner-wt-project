import db from "./db.js";
import trackTable from "./tracktable.js";
import createTable from "./table.js";

async function jointable(){
    try{
        const join=(`SELECT 
                    subject.id,
                    subject.subjectname,
                    subject.subjectcredit,
                    subject.subjectsemester,
                    subject.priority,
                    COUNT(progress.topicid) AS totalTopics,
                    SUM(progress.completed) AS completedTopics
                FROM subject
                INNER JOIN progress
                ON subject.subjectname=progress.subjectname
                GROUP BY
                    subject.id,
                    subject.subjectname,
                    subject.priority,
                    subject.subjectcredit
           `);
        const [result] = await db.query(join);
        console.log(result);
        return result;
    } catch(err){
        console.log(err.message);
        throw err;
    }
}

export default jointable;
