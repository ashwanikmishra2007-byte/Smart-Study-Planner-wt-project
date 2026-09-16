import { useState } from "react";

function Subjects() {
  const [subjectname, setsubjectname] = useState("");
  const [subjectcode, setsubjectcode] = useState("");
  const [subjectcredit, setsubjectcredit] = useState("");
  const [subjectsemester, setsubjectsemester] = useState("");
  const [priority, setpriority] = useState("");
  const [result, setresult] = useState({});
  async function addsubject(e) {
    e.preventDefault();
    console.log("Function called");
    try {
      const response = await fetch("http://localhost:3000/subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectname,
          subjectcode,
          subjectcredit,
          subjectsemester,
          priority,
        }),
      });
      const result = await response.json();
      console.log(result);
      setresult(result);
      console.log(result);
      setsubjectname("");
      setsubjectcode("");
      setsubjectcredit("");
      setsubjectsemester("");
      setpriority("");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <div
          className="d-inline-flex align-items-center justify-content-center
                       bg-primary-subtle text-primary rounded-circle mb-3"
          style={{ width: "65px", height: "65px" }}
        >
          <i className="bi bi-journal-plus fs-3"></i>
        </div>

        <h1 className="fw-bold text-dark mb-2">Add Subject</h1>

        <p className="text-muted mb-0">
          Add a subject to your academic study plan.
        </p>
      </div>

      {/* Form */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm">
            {/* Card Header */}
            <div className="card-header bg-white border-bottom py-3">
              <h5 className="fw-semibold mb-1">
                <i className="bi bi-book me-2 text-primary"></i>
                Subject Details
              </h5>

              <small className="text-muted">
                Enter the information about your subject.
              </small>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={addsubject}>
                {/* Subject Name */}
                <div className="mb-4">
                  <label
                    htmlFor="subjectName"
                    className="form-label fw-semibold"
                  >
                    Subject Name
                  </label>

                  <input
                    type="text"
                    id="subjectName"
                    className="form-control"
                    value={subjectname}
                    placeholder="e.g. Data Structures"
                    onChange={(e) => setsubjectname(e.target.value)}
                  />
                </div>

                {/* Subject Code */}
                <div className="mb-4">
                  <label
                    htmlFor="subjectCode"
                    className="form-label fw-semibold"
                  >
                    Subject Code
                  </label>

                  <input
                    type="text"
                    id="subjectCode"
                    className="form-control"
                    placeholder="e.g. CS301"
                    value={subjectcode}
                    onChange={(e) => setsubjectcode(e.target.value)}
                  />
                </div>

                {/* Credits */}
                <div className="mb-4">
                  <label htmlFor="credits" className="form-label fw-semibold">
                    Credits
                  </label>

                  <input
                    type="number"
                    value={subjectcredit}
                    id="credits"
                    className="form-control"
                    placeholder="e.g. 4"
                    onChange={(e) => setsubjectcredit(e.target.value)}
                  />

                  <div className="form-text">
                    Enter the number of credits assigned to this subject.
                  </div>
                </div>

                {/* Semester */}
                <div className="mb-4">
                  <label htmlFor="semester" className="form-label fw-semibold">
                    Semester
                  </label>

                  <select
                    id="semester"
                    className="form-select"
                    value={subjectsemester}
                    onChange={(e) => setsubjectsemester(e.target.value)}
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

                {/* Priority */}
                <div className="mb-4">
                  <label htmlFor="priority" className="form-label fw-semibold">
                    Study Priority
                  </label>

                  <select
                    id="priority"
                    className="form-select"
                    value={priority}
                    onChange={(e) => setpriority(e.target.value)}
                  >
                    <option value="">Select priority</option>

                    <option value="1">Very Low</option>
                    <option value="2">Low</option>
                    <option value="3">Medium</option>
                    <option value="4">High</option>
                    <option value="5">Very High</option>
                  </select>

                  <div className="form-text">
                    Set how much attention this subject should receive.
                  </div>
                </div>

                <hr className="my-4" />

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-100 py-2">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Subject
                </button>
              </form>

              {/* Result Message */}
              {result.message && (
                <div className="alert alert-success mt-4 mb-0">
                  <i className="bi bi-check-circle me-2"></i>
                  {result.message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="text-center mt-4">
        <small className="text-muted">
          <i className="bi bi-lightbulb me-1"></i>
          You can update the subject priority later from the Update page.
        </small>
      </div>
    </div>
  );
}

export default Subjects;
