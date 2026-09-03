import { useState, useEffect } from "react"

export default function View (){
    const [subjects, setsubjects]=useState([]);
    useEffect(function (){
        getsubjects();
    },[]);
    async function getsubjects(){
        try{
            const response = await fetch("http://localhost:3000/view");
            const data= await response.json();
            setsubjects(data);
        } catch(err){
            console.log(err.message);
        }

    }
    return (
         <div className="container mt-4">

            <h2 className="mb-4">Your Subjects</h2>

            <table className="table table-bordered table-hover">

                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>Credits</th>
                        <th>Semester</th>
                        <th>Priority</th>
                    </tr>
                </thead>

                <tbody>
                    {subjects.map((subject) => (
                        <tr key={subject.id}>
                            <td>{subject.subjectname}</td>
                            <td>{subject.subjectcode}</td>
                            <td>{subject.subjectcredit}</td>
                            <td>{subject.subjectsemester}</td>
                            <td>{subject.priority}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}