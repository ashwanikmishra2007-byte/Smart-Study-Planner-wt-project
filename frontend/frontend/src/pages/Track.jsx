import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

 function Track() {
    const [subjects, setsubjects] = useState([]);
    const [selecsubject, setselectsubject] = useState("");
    const [topicname, settopicname] = useState("");
    const [topics, settopics] = useState([]);
    const [message, setmessage]= useState("");
    const [result, setresult]= useState("");
    const [trackgraph, settrackgraph] = useState([]);

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

    async function getgraph(){
         try {
            const response = await fetch("http://localhost:3000/track/progress");

            const data = await response.json();
            console.log(data);

            settrackgraph(data);

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(()=>{
        getgraph()
    },[])

    const chartdata=trackgraph.map(subject=>{
        let percentage;
        if(subject.totaltopics==0){
            percentage=0;
        } else{
            percentage=(subject.completedtopics/subject.totaltopics)*100;
        }
        return {
            subjectname:subject.subjectname,
            percentage:percentage
        }
    });

    async function updatetopic () {
        try {
            for(const topic of topics){
                    console.log(
                        "Updating:",
                        topic.topicid,
                        topic.topicname,
                        topic.completed
                    );

                const response = await fetch("http://localhost:3000/track", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        topicid: topic.topicid,
                        completed: topic.completed
                    })
                });
                const data = await response.json();
                console.log(data);
            }
            setmessage("Progress saved");
            settopics(
                topics.map(topic=>({
                    ...topic,
                    completed:false
                }))
            );
        } catch(err){
            console.log(err.message);
        }
    }

    function handlecheck(topicid, checked){
        settopics(
            topics.map(topic=>{
                if(topic.topicid==topicid){
                    // whenever the value changes the create a new array with changed value
                    return{...topic, completed:checked};
                }
                return topic;
            })
        )
    }

    //execute this function when selectsubject exists and [selectsubject] means run when subject changes
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
        setresult(data.message);

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
                            checked={topic.completed}
                            onChange={(e)=>handlecheck(topic.topicid, e.target.checked)}
                        />

                        <label className="form-check-label">
                            {topic.topicname}
                        </label>
                    </div>
                ))}
                <button
                    className="btn btn-primary mt-2"
                    onClick={updatetopic}
                >
                    Save progress
                </button>

                {message && (
                    <div className="alert alert-success mt-3">
                        {message}
                    </div>
                 )}
            </div>

           <ResponsiveContainer width="50%" height={400}>  {/*BarChart is the main container of the graph.
           It needs to know:
how wide the graph is
how tall it is
what data it should display */}
                <BarChart data={chartdata}>
                    <CartesianGrid strokeDasharray="3 3" />

                     <XAxis dataKey="subjectname" />
                     {/*It tells Recharts:

"Keep the Y-axis from 0 to 100."

Because our value represents percentage. */}
                    <YAxis domain={[0, 100]} />

                    <Tooltip />
                    {/*Bar tells Recharts:

"Draw the actual bars."

But how does it know how tall each bar should be? */}

                    <Bar dataKey="percentage" />
                </BarChart>
            </ResponsiveContainer>

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
                {result && (
                    <div className="alert alert-success mt-3">
                        {result}
                    </div>
                 )}
            </div>

        </>
    )
}

export default Track;