import { useState, useEffect } from "react";

function Delete() {
  const [del, setdel] = useState("");
  const [message, setmessage] = useState({});
  const [subj, setSubj] = useState([]);

  useEffect(() => {
    getsubj();
  }, []);

  async function getsubj() {
    try {
      const response = await fetch("http://localhost:3000/view");
      const data = await response.json();
      setSubj(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deletsend() {
    try {
      const response = await fetch("http://localhost:3000/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectname: del,
        }),
      });
      const message = await response.json();
      setmessage(message);
      console.log("Deletion message", message);
      setdel("");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h3 className="fw-bold">Manage Subjects</h3>
                <p className="text-muted mb-0">
                  Remove a subject you no longer need
                </p>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Select Subject</label>

                <select
                  className="form-select"
                  value={del}
                  onChange={(e) => setdel(e.target.value)}
                >
                  <option value="">Choose a subject...</option>

                  {subj.map((subject) => (
                    <option
                      key={subject.subjectname}
                      value={subject.subjectname}
                    >
                      {subject.subjectname}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn btn-danger w-100"
                onClick={deletsend}
                disabled={!del}
              >
                Delete Subject
              </button>

              <div className="text-center mt-3">
                <small className="text-muted">
                  Deleting a subject will also remove its associated progress
                  data.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delete;
