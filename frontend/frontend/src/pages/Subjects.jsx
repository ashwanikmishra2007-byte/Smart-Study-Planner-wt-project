 import{useState} from 'react';
 
 function Subjects(){
    const [subjectname,setsubjectname]=useState("");
    const [subjectcode,setsubjectcode]=useState("");
    const [subjectcredit,setsubjectcredit]=useState("");
    const [subjectsemester,setsubjectsemester]=useState("");
    const [priority, setpriority]=useState("");
    const [result,setresult]=useState({});
    async function addsubject(e){
        e.preventDefault();
        console.log("Function called");
        try{
            const response = await fetch("http://localhost:3000/subject", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({subjectname,subjectcode,subjectcredit,subjectsemester,priority})
            });
            const result=await response.json();
            console.log(result);
            setresult(result);
            console.log(result);
            setsubjectname("");
            setsubjectcode("");
            setsubjectcredit("");
            setsubjectsemester("");
            setpriority("");
        } catch(err){
            console.log(err.message);
        }
    }
    return(
        <div className="container mt-4">
    <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">

            <h2 className="mb-4">Add Subject</h2>

            <form onSubmit={addsubject}>

                {/* Subject Name */}
                <div className="mb-3">
                    <label htmlFor="subjectName" className="form-label">
                        Subject Name
                    </label>

                    <input
                        type="text"
                        id="subjectName"
                        className="form-control"
                        value={subjectname}
                        placeholder="e.g. Data Structures"
                        onChange={(e)=>setsubjectname(e.target.value)}
                    />
                </div>

                {/* Subject Code */}
                <div className="mb-3">
                    <label htmlFor="subjectCode" className="form-label">
                        Subject Code
                    </label>

                    <input
                        type="text"
                        id="subjectCode"
                        className="form-control"
                        placeholder="e.g. CS301"
                        value={subjectcode}
                        onChange={(e)=>setsubjectcode(e.target.value)}
                    />
                </div>

                {/* Credits */}
                <div className="mb-3">
                    <label htmlFor="credits" className="form-label">
                        Credits
                    </label>

                    <input
                        type="number"
                        value={subjectcredit}
                        id="credits"
                        className="form-control"
                        placeholder="e.g. 4"
                        onChange={(e)=>setsubjectcredit(e.target.value)}
                    />
                </div>

                {/* Semester */}
                <div className="mb-3">
                    <label htmlFor="semester" className="form-label">
                        Semester
                    </label>

                    <select
                        id="semester"
                        className="form-select"
                        value={subjectsemester}
                        onChange={(e)=>setsubjectsemester(e.target.value)}
                    >
                        <option value="">Select semester</option>
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Semester 3</option>
                        <option value="4">Semester 4</option>
                        <option value="5">Semester 5</option>
                        <option value="6">Semester 6</option>
                        <option value="7">Semester 7</option>
                        <option value="8">Semester 8</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="semester" className="form-label">
                        Semester
                    </label>

                    <select
                        id="priority"
                        className="form-select"
                        value={priority}
                        onChange={(e)=>setpriority(e.target.value)}
                    >
                        <option value="">Select priority</option>
                        <option value="1">Very Low</option>
                        <option value="2">Low</option>
                        <option value="3">Medium</option>
                        <option value="4">High</option>
                        <option value="5">Very high</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary mt-2"
                >
                    Add Subject
                </button>

            </form>
             <div className="hello">
                <p>{result.message}</p>
            </div>

        </div>
    </div>
</div>
    )
}

export default Subjects;