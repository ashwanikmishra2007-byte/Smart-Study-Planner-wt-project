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
        <div className="container mt-5">

    {/* Page Heading */}
            <div className="mb-4">
                <h2 className="fw-bold text-dark mb-1">
                   <i className="bi bi-book me-2"></i>
                        Your Subjects
                </h2>

                <p className="text-muted mb-0">
                    Keep track of your subjects and study priorities.
                </p>
            </div>


            {/* Subjects Card */}
            <div className="card border-0 shadow-sm">

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover mb-0 align-middle">

                            <thead className="table-light">
                                <tr>
                                    <th className="px-4 py-3 text-secondary">
                                        Subject
                                    </th>

                                    <th className="py-3 text-secondary">
                                        Code
                                    </th>

                                    <th className="py-3 text-secondary">
                                        Credits
                                    </th>

                                    <th className="py-3 text-secondary">
                                        Semester
                                    </th>

                                    <th className="py-3 text-secondary">
                                        Priority
                                    </th>
                                </tr>
                            </thead>


                            <tbody>

                                {subjects.map((subject) => (

                                    <tr key={subject.id}>

                                        <td className="px-4">
                                            <div className="fw-semibold text-dark">
                                                {subject.subjectname}
                                            </div>
                                        </td>


                                        <td>
                                            <span className="badge rounded-pill text-bg-light border">
                                                {subject.subjectcode}
                                            </span>
                                        </td>


                                        <td>
                                            <span className="text-muted">
                                                {subject.subjectcredit}
                                            </span>
                                        </td>


                                        <td>
                                             <span className="text-muted">
                                                Semester {subject.subjectsemester}
                                            </span>
                                        </td>


                                          <td>
                                                <span className="badge rounded-pill bg-primary-subtle text-primary px-3">
                                                    {subject.priority}
                                                </span>
                                            </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

             </div>

         </div>

    );
}