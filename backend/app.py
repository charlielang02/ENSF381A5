# Charlie Lang - 30118227
# Justin Vuong - 30205375

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)

try:
    with open("./data/students.json", "r") as f:
        students = json.load(f)
except FileNotFoundError:
    students = []

with open("./data/courses.json") as f:
    courses = json.load(f)

with open("./data/testimonials.json") as f:
    testimonials = json.load(f)

def save_students():
    with open("./data/students.json", "w") as f:
        json.dump(students, f, indent=4)

@app.route("/register", methods=["POST"])
def register_student():
    data = request.json
    username = data.get("username")

    if any(student["username"] == username for student in students):
        return jsonify({"error": "Username already taken"}), 400

    new_student = {
        "id": len(students) + 1,
        "username": username,
        "password": data["password"],
        "email": data["email"],
        "enrolled_courses": []
    }

    students.append(new_student)
    save_students()
    return jsonify({"message": "User registered successfully", "student": new_student}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    for student in students:
        if student["username"] == username and student["password"] == password:
            return jsonify({"message": "Login successful", "student_id": student["id"]}), 200

    return jsonify({"error": "Invalid username or password"}), 401

@app.route("/testimonials", methods=["GET"])
def get_testimonials():
    return jsonify(random.sample(testimonials, 2))

@app.route("/enroll/<int:student_id>", methods=["POST"])
def enroll_course(student_id):
    data = request.json
    course_name = data.get("course")

    for student in students:
        if student["id"] == student_id:
            if course_name in student["enrolled_courses"]:
                return jsonify({"error": "Already enrolled in this course"}), 400
            student["enrolled_courses"].append(course_name)
            save_students()
            return jsonify({"message": f"Enrolled in {course_name} successfully!"}), 200

    return jsonify({"error": "Student not found"}), 404

@app.route("/drop/<int:student_id>", methods=["DELETE"])
def drop_course(student_id):
    data = request.json
    course_name = data.get("course")

    for student in students:
        if student["id"] == student_id:
            if course_name not in student["enrolled_courses"]:
                return jsonify({"error": "Course not found in enrolled courses"}), 400
            student["enrolled_courses"].remove(course_name)
            save_students()
            return jsonify({"message": f"Dropped {course_name} successfully!"}), 200

    return jsonify({"error": "Student not found"}), 404
    
@app.route("/courses", methods=["GET"])
def get_courses():
    return jsonify(courses)

@app.route("/student_courses/<int:student_id>", methods=["GET"])
def get_student_courses(student_id):
    for student in students:
        if student["id"] == student_id:
            return jsonify(student["enrolled_courses"])
    return jsonify([])


if __name__ == '__main__':
    app.run(debug=True)