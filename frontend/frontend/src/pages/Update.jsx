import { useState, useEffect } from "react";

export default function Update() {
    const [subjects,setsubjects] = useState([]);
    const [selectsubjects, setselectsubjects] = useState("");
    const [priority, setpriority] = useState("");
    const [currentPriority, setCurrentPriority] = useState("");
    const [message, setmessage] = useState({});
    async function getupdate() {
        try{
            const response = await fetch("http://localhost:3000/update");
            const data = await response.json();
            setsubjects(data);
            console.log("Fetched update data:", data);
        } catch (error) {
            console.error("Error fetching update data:", error);
        }
    }

    async function changeUpdate() {
        try{
            const response = await fetch("http://localhost:3000/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ subjectname: selectsubjects, priority: priority })
            });
            const message = await response.json();
            setmessage(message);
            console.log("Updated data:", message);
        } catch (error) {
            console.error("Error updating data:", error);
        }
    }

    function getpriority(priority) {  //function to convert priority number to string
        const priorities={
            1: "Very Low",
            2:"Low",
            3:"Medium",
            4:"High",
            5:"Very High"
        }
        return priorities[priority] || "Unknown";
    }

    useEffect(() => {
        getupdate();
    }, []);

    function HandleSelectChange() {
        const selectedSubject = subjects.find(
            (subject) => subject.subjectname === selectsubjects
        );

        return (
            <div className="mb-3">
                <label className="form-label">Select Subject</label>
                <select
                    className="form-select"
                    value={selectsubjects}
                    onChange={(e) => setselectsubjects(e.target.value)}
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
                {selectedSubject && (  //only show the priority select if a subject is selected
                    <div className="mt-2">
                        <p>Current Priority: {getpriority(selectedSubject.priority)}</p>
                        <select
                             className="form-select"
                            value={priority}
                            onChange={(e) => setpriority(e.target.value)}
                        >
                            <option value="">
                                Select new priority
                            </option>

                            <option value="1">Very Low</option>
                            <option value="2">Low</option>
                            <option value="3">Medium</option>
                            <option value="4">High</option>
                            <option value="5">Very High</option>
                        </select>
                        <button className="btn btn-primary mt-2" onClick={changeUpdate}>
                            Update Priority
                        </button>
                        <div className="mt-2">
                            <p>{message.message}</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
    return (
        <HandleSelectChange/>
    )
}