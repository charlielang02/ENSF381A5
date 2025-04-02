import React from "react";
import EnrolledCourse from "./EnrolledCourse";
import { dropCourseAPI } from "../api";
import { useAuth } from "./AuthProvider";
import "../CoursesPage.css";

const EnrollmentList = ({ enrolledCourses, setEnrolledCourses }) => {
  const { user } = useAuth();

  const dropCourse = async (courseToDrop) => {
    if (!user || !user.id) {
      return;
    }
    try {
      const response = await dropCourseAPI(user.id, courseToDrop.name);
      if (response.message) {
        const updatedCourses = enrolledCourses
          .map((course) =>
            course.name === courseToDrop.name ? { ...course, count: course.count - 1 } : course
          )
          .filter((course) => course.count > 0);

        setEnrolledCourses(updatedCourses);
      } else {
        console.error("Failed to drop course:", response.message);
      }
    } catch (error) {
      console.error("Error dropping course:", error);
    }
  };

  const totalCreditHours = enrolledCourses.reduce((sum, course) => sum + (3 * course.count), 0);

  return (
    <div className="enrollment">
      <h2>Enrolled Courses</h2>
      <div className="enrollment-list">
        {enrolledCourses.length === 0 ? (
          <p>No courses enrolled yet.</p>
        ) : (
          enrolledCourses.map((course) => (
            <EnrolledCourse key={course.id} course={course} onDrop={dropCourse} />
          ))
        )}
      </div>
      <p><strong>Total Credit Hours:</strong> {totalCreditHours}</p>
    </div>
  );
  
};

export default EnrollmentList;
