import InstructorLayout from "@/Layouts/InstructorLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaUserGraduate, FaChalkboardTeacher, FaTasks } from "react-icons/fa";

export default function Dashboard({
    tasks = [],
    myStudent = [],
    myClasses = [],
}) {
    const [date, setDate] = useState(new Date());
    const user = usePage().props.auth.user;

    const formatTime12Hour = (timeStr) => {
        const [hour, minute] = timeStr.split(":");
        const date = new Date();
        date.setHours(parseInt(hour), parseInt(minute));
        return date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <InstructorLayout>
            <Head title="Instructor Dashboard" />
            <div className="min-h-screen via-white to-purple-50 p-8">
                {/* Profile Card */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Content (2/3) */}
                    <div className="md:col-span-2 flex flex-col gap-8">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-2">
                            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center border border-blue-100 hover:shadow-xl transition-all">
                                <FaUserGraduate className="text-blue-400 text-4xl mb-2" />
                                <div className="text-3xl font-bold text-gray-800 mb-1">
                                    {myStudent.length}
                                </div>
                                <div className="text-blue-500 text-base font-medium tracking-wide">
                                    Students
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center border border-blue-100 hover:shadow-xl transition-all">
                                <FaChalkboardTeacher className="text-purple-400 text-4xl mb-2" />
                                <div className="text-3xl font-bold text-gray-800 mb-1">
                                    {myClasses.length}
                                </div>
                                <div className="text-purple-500 text-base font-medium tracking-wide">
                                    Classes
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center border border-blue-100 hover:shadow-xl transition-all">
                                <FaTasks className="text-green-400 text-4xl mb-2" />
                                <div className="text-3xl font-bold text-gray-800 mb-1">
                                    {tasks.length}
                                </div>
                                <div className="text-green-500 text-base font-medium tracking-wide">
                                    Tasks
                                </div>
                            </div>
                        </div>

                        {/* Students and Schedule */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* My Students */}
                            <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
                                <h2 className="text-xl font-bold text-blue-500 mb-4 tracking-tight">
                                    My Students
                                </h2>
                                <ul className="space-y-2 text-gray-700 text-base max-h-48 overflow-y-auto">
                                    {myStudent.length > 0 ? (
                                        myStudent.map((student) => (
                                            <li
                                                key={student.id}
                                                className="rounded px-2 py-1 hover:bg-blue-50 transition-colors"
                                            >
                                                {student.firstname}{" "}
                                                {student.lastname}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="italic text-gray-400">
                                            No students found.
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* My Schedule */}
                            <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
                                <h2 className="text-xl font-bold text-purple-500 mb-4 tracking-tight">
                                    My Schedule
                                </h2>
                                <ul className="space-y-2 text-gray-700 text-base max-h-48 overflow-y-auto">
                                    {myClasses.length > 0 ? (
                                        myClasses.map((cls) => (
                                            <li
                                                key={cls.id}
                                                className="rounded px-2 py-1 hover:bg-purple-50 transition-colors"
                                            >
                                                <strong>{cls.name}</strong> -{" "}
                                                {formatTime12Hour(
                                                    cls.start_time
                                                )}{" "}
                                                to{" "}
                                                {formatTime12Hour(cls.end_time)}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="italic text-gray-400">
                                            No schedule found.
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Class Details */}
                        <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
                            <h2 className="text-xl font-bold text-green-500 mb-4 tracking-tight">
                                My Classes
                            </h2>
                            <ul className="space-y-2 text-gray-700 text-base max-h-48 overflow-y-auto">
                                {myClasses.length > 0 ? (
                                    myClasses.map((cls) => (
                                        <li
                                            key={cls.id}
                                            className="rounded px-2 py-1 hover:bg-green-50 transition-colors"
                                        >
                                            <span className="font-medium">
                                                {cls.name}
                                            </span>{" "}
                                            - <span>{cls.description}</span> (
                                            {cls.subcode})
                                        </li>
                                    ))
                                ) : (
                                    <li className="italic text-gray-400">
                                        No classes found.
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Right Sidebar (1/3) */}
                    <div className="flex flex-col gap-8">
                        {/* Calendar */}
                        <div className="bg-white rounded-2xl shadow p-6 border border-blue-100">
                            <h2 className="text-xl font-bold text-blue-500 mb-4 tracking-tight">
                                Calendar
                            </h2>
                            <Calendar
                                onChange={setDate}
                                value={date}
                                className="rounded-lg border-0 shadow-none"
                            />
                        </div>

                        {/* Tasks */}
                        <div className="bg-white rounded-2xl shadow p-6 flex-1 border border-blue-100">
                            <h2 className="text-xl font-bold text-green-500 mb-4 tracking-tight">
                                Your Tasks
                            </h2>
                            <ul className="list-disc list-inside space-y-3 text-gray-700 text-base max-h-48 overflow-y-auto">
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <li
                                            key={task.id}
                                            className="rounded px-2 py-1 hover:bg-green-50 transition-colors"
                                        >
                                            <span className="font-medium">
                                                {task.title}
                                            </span>
                                            {task.description && (
                                                <span className="text-gray-500">
                                                    {" "}
                                                    – {task.description}
                                                </span>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <li className="italic text-gray-400">
                                        No tasks yet.
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
}
