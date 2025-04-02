import React from "react";
import EnrolledCourse from "./EnrolledCourse";
import "../CoursesPage.css";

const EnrollmentList = ({ enrolledCourses, setEnrolledCourses }) => {
  const dropCourse = (courseToDrop) => {
    const updatedCourses = enrolledCourses
      .map((course) =>
        course.id === courseToDrop.id ? { ...course, count: course.count - 1 } : course
      )
      .filter((course) => course.count > 0);

    setEnrolledCourses(updatedCourses);
  };

  const totalCreditHours = enrolledCourses.reduce((sum, course) => sum + (3 * course.count), 0);

  return (
    <div className="enrollment">
      <h2>Enrolled Courses</h2>
      <div className="enrollment-list">
      {enrolledCourses.length === 0 ? <p>No courses enrolled yet.</p> : 
        enrolledCourses.map((course) => (
          <EnrolledCourse key={course.id} course={course} onDrop={dropCourse} />
        ))
      }
      </div>
      <p><strong>Total Credit Hours:</strong> {totalCreditHours}</p>
    </div>
  );
};

export default EnrollmentList;

