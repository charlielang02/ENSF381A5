import React from "react";
import CourseItem from "./CourseItem";
import courses from "../data/courses";
import "../CoursesPage.css";

const CourseCatalog = ({ onEnroll }) => {
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
