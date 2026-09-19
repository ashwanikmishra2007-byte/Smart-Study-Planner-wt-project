import { useState, useEffect } from "react";

function Schedule() {
  const [schedule, setschedule] = useState([]);

  useEffect(() => {
    getschedule();
  }, []);

  async function getschedule() {
    try {
      const response = await fetch("http://localhost:3000/schedule");
      const data = await response.json();
      setschedule(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
<div className="container mt-4">

    {/* Heading */}
    <div className="text-center mb-4">
        <h2 className="fw-bold">
            Today's Study Schedule
        </h2>

        <p className="text-muted">
            Focus on what matters most today
        </p>
    </div>


    {/* Schedule */}
    <div className="row justify-content-center">

        <div className="col-md-9 col-lg-8">

            {schedule.map((subject, index) => {

                const progress =
                    (subject.completedTopics / subject.totalTopics) * 100;

                return (
                    <div
                        className="card border-0 shadow-sm rounded-3 mb-3"
                        key={subject.subjectid}
                    >

                        <div className="card-body p-4">

                            {/* Top section */}
                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <div className="d-flex align-items-center">

                                    {/* Schedule number */}
                                    <div
                                        className="bg-primary text-white rounded-circle
                                                   d-flex align-items-center justify-content-center
                                                   me-3"
                                        style={{
                                            width: "42px",
                                            height: "42px"
                                        }}
                                    >
                                        <strong>
                                            {index + 1}
                                        </strong>
                                    </div>

                                    <div>
                                        <h4 className="mb-0 fw-bold">
                                            {subject.subjectname}
                                        </h4>

                                        <small className="text-muted">
                                            {subject.completedTopics} of {subject.totalTopics} topics completed
                                        </small>
                                    </div>

                                </div>


                                {/* Priority */}
                                <span className="badge bg-warning text-dark">
                                    Priority {subject.priority}/5
                                </span>

                            </div>


                            {/* Progress */}
                            <div className="mb-3">

                                <div className="d-flex justify-content-between mb-1">

                                    <small className="text-muted">
                                        Study Progress
                                    </small>

                                    <small className="fw-bold">
                                        {Math.round(progress)}%
                                    </small>

                                </div>

                                <div
                                    className="progress"
                                    style={{ height: "8px" }}
                                >
                                    <div
                                        className="progress-bar bg-success"
                                        role="progressbar"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>

                            </div>


                            {/* Bottom information */}
                            <div className="d-flex justify-content-between align-items-center">

                                <span className="badge bg-light text-dark border">
                                    📖 {subject.remainingtopics} topics remaining
                                </span>

                                <span className="text-muted small">
                                    Keep going!
                                </span>

                            </div>

                        </div>

                    </div>
                );

            })}

        </div>

    </div>

</div>

  );
}

export default Schedule;