import React from "react";

const EnrolledCourse = ({ course, onDrop }) => {
  return (
    <div className="enrolled-course">
      <span>{course.name} (3 hrs)</span>
      <br /><br />
      <button onClick={() => onDrop(course)}>Drop</button>
    </div>
  );
};

export default EnrolledCourse;
