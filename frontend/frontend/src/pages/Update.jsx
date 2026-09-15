import { useState, useEffect } from "react";

export default function Update() {
  const [subjects, setsubjects] = useState([]);
  const [selectsubjects, setselectsubjects] = useState("");
  const [priority, setpriority] = useState("");
  const [currentPriority, setCurrentPriority] = useState("");
  const [message, setmessage] = useState({});
  async function getupdate() {
    try {
      const response = await fetch("http://localhost:3000/update");
      const data = await response.json();
      setsubjects(data);
      console.log("Fetched update data:", data);
    } catch (error) {
      console.error("Error fetching update data:", error);
    }
  }

  async function changeUpdate() {
    try {
      const response = await fetch("http://localhost:3000/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectname: selectsubjects,
          priority: priority,
        }),
      });
      const message = await response.json();
      setmessage(message);
      console.log("Updated data:", message);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }

  function getpriority(priority) {
    //function to convert priority number to string
    const priorities = {
      1: "Very Low",
      2: "Low",
      3: "Medium",
      4: "High",
      5: "Very High",
    };
    return priorities[priority] || "Unknown";
  }

  useEffect(() => {
    getupdate();
  }, []);

  function HandleSelectChange() {
    const selectedSubject = subjects.find(
      (subject) => subject.subjectname === selectsubjects,
    );

    return (
      <div className="mb-4">
        {/* Select Subject */}
        <label className="form-label fw-semibold">Select Subject</label>

        <select
          className="form-select"
          value={selectsubjects}
          onChange={(e) => setselectsubjects(e.target.value)}
        >
          <option value="">Select a subject</option>

          {subjects.map((subject) => (
            <option key={subject.subjectname} value={subject.subjectname}>
              {subject.subjectname}
            </option>
          ))}
        </select>

        {/* Show priority section only after selecting subject */}
        {selectedSubject && (
          <div className="card border-0 bg-light mt-4">
            <div className="card-body p-4">
              {/* Subject information */}
              <div className="mb-3">
                <h5 className="fw-bold mb-1">{selectedSubject.subjectname}</h5>

                <p className="text-muted mb-0">
                  Update the study priority for this subject.
                </p>
              </div>

              <div />

              {/* Current Priority */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Current Priority
                </label>

                <div>
                  <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
                    {getpriority(selectedSubject.priority)}
                  </span>
                </div>
              </div>

              {/* New Priority */}
              <div className="mb-3">
                <label className="form-label fw-semibold">New Priority</label>

                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setpriority(e.target.value)}
                >
                  <option value="">Select new priority</option>

                  <option value="1">Very Low</option>
                  <option value="2">Low</option>
                  <option value="3">Medium</option>
                  <option value="4">High</option>
                  <option value="5">Very High</option>
                </select>

                <div className="form-text">
                  Higher priority subjects can be given more attention in your
                  study plan.
                </div>
              </div>

              {/* Update Button */}
              <button className="btn btn-primary px-4" onClick={changeUpdate}>
                <i className="bi bi-check2-circle me-2"></i>
                Update Priority
              </button>

              {/* Message */}
              <div className="mt-3">
                {message.message && (
                  <div className="alert alert-success py-2 mb-0">
                    {message.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <div className="mb-3">
          <span
            className="d-inline-flex align-items-center justify-content-center
                             bg-primary-subtle text-primary rounded-circle"
            style={{ width: "60px", height: "60px" }}
          >
            <i className="bi bi-journal-bookmark-fill fs-3"></i>
          </span>
        </div>

        <h1 className="fw-bold text-dark mb-2">Update Subject Priority</h1>

        <p className="text-muted mb-0">
          Organize your subjects according to your study priorities.
        </p>
      </div>

      {/* Main Content */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            {/* Card Header */}
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="fw-semibold mb-1">
                <i className="bi bi-sliders me-2 text-primary"></i>
                Subject Priority
              </h5>

              <small className="text-muted">
                Select a subject and choose its new priority level.
              </small>
            </div>

            {/* Card Body */}
            <div className="card-body p-4">
              <HandleSelectChange />
            </div>
          </div>
        </div>
      </div>

      {/* Small Footer Hint */}
      <div className="text-center mt-4">
        <small className="text-muted">
          <i className="bi bi-lightbulb me-1"></i>
          Set higher priority for subjects that need more study time.
        </small>
      </div>
    </div>
  );
}
