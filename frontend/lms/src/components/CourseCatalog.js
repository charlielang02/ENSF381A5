import React from "react";
import CourseItem from "./CourseItem";
import "../CoursesPage.css";

const CourseCatalog = ({ courses, onEnroll }) => {
  if (!courses || courses.length === 0) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="course-catalog">
      <h2>Available Courses</h2>
      <div className="course-list">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} onEnroll={onEnroll} />
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;

