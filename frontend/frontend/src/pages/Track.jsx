import { useState, useEffect } from "react";

 function Track() {
    const [subjects, setsubjects] = useState([]);
    const [selecsubject, setselectsubject] = useState("");
    const [topicname, settopicname] = useState("");
    const [topics, settopics] = useState([]);

    async function getsubjects() {  //getting subjects from backend to display in frontend
        try {
            const response = await fetch("http://localhost:3000/view");
            const data = await response.json();
            setsubjects(data);
        } catch (err) {
            console.log(err.message);
        }
    }

    async function gettopic() {
        try{
            //select the topics from backend of only the selected subject
            const response=await fetch(`http://localhost:3000/track?subjectname=${selecsubject}`);  
            const data=await response.json();
            settopics(data);

        } catch(err){
            console.log(err.message);
        }
    }

    useEffect(()=>{
        if(selecsubject){
            gettopic();
        }
    }, [selecsubject]);

    async function settopic(){  //sending topics tobackend
        try {
        const response = await fetch("http://localhost:3000/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subjectname: selecsubject,
                topicname: topicname,
                completed: false
            })
        });

        const data = await response.json();

        console.log(data);

        settopicname("");

    } catch (err) {
        console.log(err.message);
    }
    }


    useEffect(() => {
        getsubjects();
    }, []);

    

    return (
        <>
        {/*selct input*/}
        <div className="container mt-4">
                <h2 className="mb-4">Track Your Progress</h2>

                <label className="form-label">
                    Select subject
                </label>

                <select
                    className="form-select"
                    value={selecsubject}
                    onChange={(e) => setselectsubject(e.target.value)}
                >
                    <option value="">
                        Select a subject
                    </option>

                    {subjects.map((subject) => (
                        <option
                            key={subject.subjectname}
                            value={subject.subjectname}
                        >
                            {subject.subjectname}
                        </option>
                    ))}
                </select>
            </div>

            {/*topicselection*/}
            <div className="container mt-4">
                <h4>Topics</h4>

                {topics.map((topic) => (
                    <div key={topic.topicid} className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                        />

                        <label className="form-check-label">
                            {topic.topicname}
                        </label>
                    </div>
                ))}
            </div>

            {/*inputform*/}
            <div className="container mt-4">
                <div className="row justify-content-left">
                    <div className="col-md-7 col-lg-6">

                        <label className="form-label">
                            Add Topic
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter topic name"
                            value={topicname}
                            onChange={(e) =>
                                settopicname(e.target.value)
                            }
                            disabled={!selecsubject}
                        />

                        <button
                            className="btn btn-primary mt-2"
                            onClick={settopic}
                        >
                            Add Topic
                        </button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Track;