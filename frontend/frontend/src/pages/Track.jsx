import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Track() {
  const [subjects, setsubjects] = useState([]);
  const [selecsubject, setselectsubject] = useState("");
  const [topicname, settopicname] = useState("");
  const [topics, settopics] = useState([]);
  const [message, setmessage] = useState("");
  const [result, setresult] = useState("");
  const [trackgraph, settrackgraph] = useState([]);

  async function getsubjects() {
    //getting subjects from backend to display in frontend
    try {
      const response = await fetch("http://localhost:3000/view");
      const data = await response.json();
      setsubjects(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function gettopic() {
    try {
      //select the topics from backend of only the selected subject
      const response = await fetch(
        `http://localhost:3000/track?subjectname=${selecsubject}`,
      );
      const data = await response.json();
      settopics(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function getgraph() {
    try {
      const response = await fetch("http://localhost:3000/track/progress");

      const data = await response.json();
      console.log(data);

      settrackgraph(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getgraph();
  }, []);

  const chartdata = trackgraph.map((subject) => {
    let percentage;
    if (subject.totaltopics == 0) {
      percentage = 0;
    } else {
      percentage = (subject.completedtopics / subject.totaltopics) * 100;
    }
    return {
      subjectname: subject.subjectname,
      percentage: percentage,
    };
  });

  async function updatetopic() {
    try {
      for (const topic of topics) {
        console.log(
          "Updating:",
          topic.topicid,
          topic.topicname,
          topic.completed,
        );

        const response = await fetch("http://localhost:3000/track", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topicid: topic.topicid,
            completed: topic.completed,
          }),
        });
        const data = await response.json();
        console.log(data);
      }
      setmessage("Progress saved");
      settopics(
        topics.map((topic) => ({
          ...topic,
          completed: false,
        })),
      );
    } catch (err) {
      console.log(err.message);
    }
  }

  function handlecheck(topicid, checked) {
    settopics(
      topics.map((topic) => {
        if (topic.topicid == topicid) {
          // whenever the value changes the create a new array with changed value
          return { ...topic, completed: checked };
        }
        return topic;
      }),
    );
  }

  //execute this function when selectsubject exists and [selectsubject] means run when subject changes
  useEffect(() => {
    if (selecsubject) {
      gettopic();
    }
  }, [selecsubject]);

  async function settopic() {
    //sending topics tobackend
    try {
      const response = await fetch("http://localhost:3000/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectname: selecsubject,
          topicname: topicname,
          completed: false,
        }),
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
      {/* SELECT SUBJECT */}
      <div className="container mt-4">
        <div className="p-4 rounded-4 shadow-sm bg-light">
          <div className="mb-3">
            <h2 className="fw-bold mb-1">Track Your Progress</h2>
            <p className="text-muted mb-0">
              Keep track of the topics you have completed.
            </p>
          </div>

          <label className="form-label fw-semibold">Select Subject</label>

          <select
            className="form-select form-select-lg"
            value={selecsubject}
            onChange={(e) => setselectsubject(e.target.value)}
          >
            <option value="">Select a subject</option>

            {subjects.map((subject) => (
              <option key={subject.subjectname} value={subject.subjectname}>
                {subject.subjectname}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TOPIC SELECTION */}
      <div className="container mt-4">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="me-3 fs-3"></div>

              <div>
                <h4 className="fw-bold mb-0">Topics</h4>

                <small className="text-muted">
                  Mark the topics you have completed
                </small>
              </div>
            </div>

            {topics.length === 0 ? (
              <div className="text-center py-4 text-muted">
                <div className="fs-1 mb-2"></div>

                <p className="mb-0">Select a subject to see its topics.</p>
              </div>
            ) : (
              topics.map((topic) => (
                <div
                  key={topic.topicid}
                  className="form-check p-3 mb-2 rounded-3 bg-light"
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={topic.completed}
                    onChange={(e) =>
                      handlecheck(topic.topicid, e.target.checked)
                    }
                  />

                  <label className="form-check-label ms-2">
                    {topic.topicname}
                  </label>
                </div>
              ))
            )}

            <button className="btn btn-primary mt-3 px-4" onClick={updatetopic}>
                Save Progress
            </button>

            {message && (
              <div className="alert alert-success mt-3 mb-0">{message}</div>
            )}
          </div>
        </div>
      </div>

      {/* PROGRESS GRAPH */}
      <div className="container mt-4">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <div className="mb-3">
              <h4 className="fw-bold mb-1">Study Progress</h4>

              <p className="text-muted mb-0">
                See how much of each subject you have completed.
              </p>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartdata}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="subjectname" />

                <YAxis domain={[0, 100]} />

                <Tooltip />

                <Bar dataKey="percentage" radius={[8, 8, 0, 0]} /> {/* radius top-left top-right bottom left bottom right */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ADD TOPIC */}
      <div className="container mt-4 mb-5">
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="me-3 fs-3"></div>

              <div>
                <h4 className="fw-bold mb-0">Add Topic</h4>

                <small className="text-muted">
                  Add a new topic to your study list
                </small>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7 col-lg-6">
                <label className="form-label fw-semibold">Topic Name</label>

                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="e.g. Binary Trees"
                  value={topicname}
                  onChange={(e) => settopicname(e.target.value)}
                  disabled={!selecsubject}
                />

                <button
                  className="btn btn-primary mt-3 px-4"
                  onClick={settopic}
                >
                  Add Topic
                </button>
              </div>
            </div>

            {result && (
              <div className="alert alert-success mt-3 mb-0">{result}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Track;
