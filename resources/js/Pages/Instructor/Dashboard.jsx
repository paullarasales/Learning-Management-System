import InstructorLayout from "@/Layouts/InstructorLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaUserGraduate, FaChalkboardTeacher, FaTasks } from "react-icons/fa";

export default function Dashboard({
    tasks = [],
    myStudents = [],
    myClasses = [],
}) {
    const [date, setDate] = useState(new Date());
    const user = usePage().props.auth.user;

    console.log("Student:", myStudents);

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
            <div className="min-h-screen p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Left Content (2/3) */}
                    <div className="md:col-span-2 flex flex-col gap-10">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-2">
                            <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-8 flex flex-col items-center border border-blue-200 hover:shadow-2xl transition-all">
                                <FaUserGraduate className="text-blue-500 text-5xl mb-3 drop-shadow" />
                                <div className="text-4xl font-extrabold text-gray-800 mb-1">
                                    {myStudents.length}
                                </div>
                                <div className="text-blue-600 text-lg font-semibold tracking-wide uppercase">
                                    Students
                                </div>
                            </div>
                            <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-8 flex flex-col items-center border border-purple-200 hover:shadow-2xl transition-all">
                                <FaChalkboardTeacher className="text-purple-500 text-5xl mb-3 drop-shadow" />
                                <div className="text-4xl font-extrabold text-gray-800 mb-1">
                                    {myClasses.length}
                                </div>
                                <div className="text-purple-600 text-lg font-semibold tracking-wide uppercase">
                                    Classes
                                </div>
                            </div>
                            <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-8 flex flex-col items-center border border-green-200 hover:shadow-2xl transition-all">
                                <FaTasks className="text-green-500 text-5xl mb-3 drop-shadow" />
                                <div className="text-4xl font-extrabold text-gray-800 mb-1">
                                    {tasks.length}
                                </div>
                                <div className="text-green-600 text-lg font-semibold tracking-wide uppercase">
                                    Tasks
                                </div>
                            </div>
                        </div>

                        {/* Students and Schedule */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* My Students */}
                            <div className="bg-white/90 rounded-3xl shadow-lg p-7 border border-blue-100 flex flex-col">
                                <h2 className="text-2xl font-bold text-blue-600 mb-5 tracking-tight flex items-center gap-2">
                                    <FaUserGraduate className="text-blue-400" />{" "}
                                    My Students
                                </h2>
                                <ul className="space-y-3 text-gray-700 text-base max-h-56 overflow-y-auto">
                                    {myStudents.map((student) => (
                                        <li
                                            key={student.id}
                                            className="bg-blue-50 p-3 rounded-xl shadow-sm"
                                        >
                                            <div className="font-semibold">
                                                {student.firstname}{" "}
                                                {student.lastname}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {student.email}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* My Schedule */}
                            <div className="bg-white/90 rounded-3xl shadow-lg p-7 border border-purple-100 flex flex-col">
                                <h2 className="text-2xl font-bold text-purple-600 mb-5 tracking-tight flex items-center gap-2">
                                    <FaChalkboardTeacher className="text-purple-400" />{" "}
                                    My Schedule
                                </h2>
                                <ul className="space-y-3 text-gray-700 text-base max-h-56 overflow-y-auto">
                                    {myClasses.length > 0 ? (
                                        myClasses.map((cls) => (
                                            <li
                                                key={cls.id}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2 bg-purple-50/60 hover:bg-purple-100 transition-colors shadow-sm"
                                            >
                                                <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-700 text-lg">
                                                    {cls.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-purple-700">
                                                        {cls.name}
                                                    </span>
                                                    <span className="block text-xs text-gray-500">
                                                        {formatTime12Hour(
                                                            cls.start_time
                                                        )}{" "}
                                                        -{" "}
                                                        {formatTime12Hour(
                                                            cls.end_time
                                                        )}
                                                    </span>
                                                </div>
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
                        <div className="bg-white/90 rounded-3xl shadow-lg p-7 border border-green-100">
                            <h2 className="text-2xl font-bold text-green-600 mb-5 tracking-tight flex items-center gap-2">
                                <FaChalkboardTeacher className="text-green-400" />{" "}
                                My Classes
                            </h2>
                            <ul className="space-y-3 text-gray-700 text-base max-h-56 overflow-y-auto">
                                {myClasses.length > 0 ? (
                                    myClasses.map((cls) => (
                                        <li
                                            key={cls.id}
                                            className="flex items-center gap-3 rounded-xl px-3 py-2 bg-green-50/60 hover:bg-green-100 transition-colors shadow-sm"
                                        >
                                            <div className="w-9 h-9 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-700 text-lg">
                                                {cls.name.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="font-semibold text-green-700">
                                                    {cls.name}
                                                </span>
                                                <span className="block text-xs text-gray-500">
                                                    {cls.description} (
                                                    {cls.subcode})
                                                </span>
                                            </div>
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
                    <div className="flex flex-col gap-10">
                        {/* Calendar */}
                        <div className="bg-white/90 rounded-3xl shadow-lg p-7 border border-blue-100">
                            <h2 className="text-2xl font-bold text-blue-600 mb-5 tracking-tight flex items-center gap-2">
                                <span className="inline-block w-6 h-6 bg-blue-200 rounded-full mr-2" />{" "}
                                Calendar
                            </h2>
                            <Calendar
                                onChange={setDate}
                                value={date}
                                className="rounded-lg border-0 shadow-none"
                            />
                        </div>

                        {/* Tasks */}
                        <div className="bg-white/90 rounded-3xl shadow-lg p-7 flex-1 border border-green-100">
                            <h2 className="text-2xl font-bold text-green-600 mb-5 tracking-tight flex items-center gap-2">
                                <FaTasks className="text-green-400" /> Your
                                Tasks
                            </h2>
                            <ul className="list-none space-y-4 text-gray-700 text-base max-h-56 overflow-y-auto">
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <li
                                            key={task.id}
                                            className="flex items-start gap-3 rounded-xl px-3 py-2 bg-green-50/60 hover:bg-green-100 transition-colors shadow-sm"
                                        >
                                            <div className="w-7 h-7 rounded-full bg-green-200 flex items-center justify-center mt-1">
                                                <FaTasks className="text-green-600 text-lg" />
                                            </div>
                                            <div>
                                                <span className="font-semibold text-green-700">
                                                    {task.title}
                                                </span>
                                                {task.description && (
                                                    <span className="block text-gray-500 text-sm mt-1">
                                                        {task.description}
                                                    </span>
                                                )}
                                            </div>
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
