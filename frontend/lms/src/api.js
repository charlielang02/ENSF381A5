const BASE_URL = "http://127.0.0.1:5000";

export async function registerUser(username, password, email) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email })
    });

    return response.json();
}

export async function loginUser(username, password) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    return response.json();
}

export async function getCourses() {
    const response = await fetch(`${BASE_URL}/courses`);
    return response.json();
}

export async function getStudentCourses(studentId) {
    const response = await fetch(`${BASE_URL}/student_courses/${studentId}`);
    return response.json();
}

export async function enrollInCourse(studentId, course) {
    const response = await fetch(`${BASE_URL}/enroll/${studentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course })
    });

    return response.json();
}

export async function dropCourseAPI(studentId, course) {
    const response = await fetch(`${BASE_URL}/drop/${studentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course })
    });

    return response.json();
}

export async function getTestimonials() {
    const response = await fetch(`${BASE_URL}/testimonials`);
    return response.json();
}
