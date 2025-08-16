📚 Learning Management System (LMS)

A modern Learning Management System built with Laravel (backend) and React + Inertia.js (frontend).
This project is a capstone system designed to support online classes, assignments, quizzes, discussions, and video conferencing, similar to MS Teams but with a cleaner and modern UI.

🚀 Features
👨‍🏫 For Instructors

Create and manage classrooms

Post threads and learning materials

Create and grade assignments & quizzes

View student submissions and scores

Conduct video conferences with students

👩‍🎓 For Students

Join classrooms

Access materials, assignments, and quizzes

Submit assignments and take quizzes

View grades and feedback

Participate in video calls

🛠 For Coordinators/Admin

Manage instructors and students

Oversee classroom activities

Monitor system usage

🏗 Tech Stack

Backend: Laravel (API + Inertia)

Frontend: React with Inertia.js

Styling: Tailwind CSS

Database: MySQL

Video Conferencing: WebRTC / Third-party integration (to be added)

⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/darakushinji/Learning-Management-System.git
cd Learning-Management-System

2️⃣ Backend Setup (Laravel)
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve

3️⃣ Frontend Setup (React + Inertia)
cd frontend
npm install
npm run dev

📂 Project Structure
lms-capstone/
├── app/             # Laravel backend logic
├── resources/
│   ├── js/          # React (Inertia) frontend
│   ├── views/       # Blade templates (for Inertia entry)
├── routes/
│   ├── web.php      # Inertia routes
│   └── api.php      # API routes
├── database/        # Migrations & seeders
└── public/          # Public assets


👥 Contributors

Daraku Shinji – Full-stack Developer

📜 License

This project is for educational purposes only.
