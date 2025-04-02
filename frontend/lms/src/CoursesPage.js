import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseCatalog from "./components/CourseCatalog";
import EnrollmentList from "./components/EnrollmentList";
import { getCourses, enrollInCourse, getStudentCourses } from "./api"; import "./CoursesPage.css";
import { useAuth } from "./components/AuthProvider";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseData = await getCourses();
        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [user.id]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const enrolledData = await getStudentCourses(user.id);
        if (enrolledData && enrolledData.length > 0) {
          setEnrolledCourses(enrolledData.map(courseName => ({ name: courseName, count: 1 })));
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      }
    };
    fetchEnrolledCourses();
  }, [user.id]);
  

  const enrollCourse = async (course) => {
    const alreadyEnrolled = enrolledCourses.some((c) => c.name === course.name);

    if (alreadyEnrolled) {
      alert("You are already enrolled in this course!");
      return;
    }

    try {
      const response = await enrollInCourse(user.id, course.name);
      if (response.message) {
        setEnrolledCourses((prev) => {
          const existing = prev.find((c) => c.name === course.name);
          if (existing) {
            return prev.map((c) =>
              c.name === course.name ? { ...c, count: c.count + 1 } : c
            );
          } else {
            return [...prev, { ...course, count: 1 }];
          }
        });
      } else {
        console.error("Failed to enroll in course:", response.message);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <div className="courses-page">
      <Header />
      <div className="content">
        <CourseCatalog courses={courses} onEnroll={enrollCourse} />
        <EnrollmentList
          enrolledCourses={enrolledCourses}
          setEnrolledCourses={setEnrolledCourses}
        />
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;
