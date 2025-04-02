import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CourseCatalog from "./components/CourseCatalog";
import EnrollmentList from "./components/EnrollmentList";
import "./CoursesPage.css";

const CoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolledCourses(savedCourses);
  }, []);

  useEffect(() => {
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const enrollCourse = (course) => {
    setEnrolledCourses((prev) => {
      const existing = prev.find((c) => c.id === course.id);
      if (existing) {
        return prev.map((c) => 
          c.id === course.id ? { ...c, count: c.count + 1 } : c
        );
      } else {
        return [...prev, { ...course, count: 1 }];
      }
    });
  };

  return (
    <div className="courses-page">
      <Header />
      <div className="content">
        <CourseCatalog onEnroll={enrollCourse} />
        <EnrollmentList enrolledCourses={enrolledCourses} setEnrolledCourses={setEnrolledCourses} />
      </div>
      <Footer />
    </div>
  );
};

export default CoursesPage;
