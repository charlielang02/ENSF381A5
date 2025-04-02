import React, { useEffect, useState } from "react";
import courses from "../data/courses";
import testimonials from "../data/testimonials";
import "./MainSection.css";

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);

  useEffect(() => {
    setFeaturedCourses(courses.sort(() => 0.5 - Math.random()).slice(0, 3));
    setRandomTestimonials(testimonials.sort(() => 0.5 - Math.random()).slice(0, 2));
  }, []);

  return (
    <main className="main">
      <section className="about">
        <h2>About LMS</h2>
        <p>The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently.</p>
      </section>

      <section className="featured">
        <h2>Featured Courses</h2>
        <div className="course-list">
          {featuredCourses.map(course => (
            <div key={course.id} className="course">
              <img src={course.image} alt={course.name} />
              <h3>{course.name}</h3>
              <p>{course.instructor}</p>
              <p>{course.duration}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>Student Testimonials</h2>
        {randomTestimonials.map((test, index) => (
          <div key={index} className="testimonial">
            <p>{test.review}</p>
            <p>- {test.studentName}</p>
            <p>{'★'.repeat(test.rating) + '☆'.repeat(5 - test.rating)}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MainSection;
