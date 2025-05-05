import InstructorLayout from "@/Layouts/InstructorLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Dashboard({
    tasks = [],
    myStudent = [],
    myClasses = [],
}) {
    const [date, setDate] = useState(new Date());
    const user = usePage().props.auth.user;

    return (
        <InstructorLayout>
            <Head title="Instructor Dashboard" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="grid grid-cols-3 gap-4">
                    {/* Left Content (2/3) */}
                    <div className="col-span-2 flex flex-col gap-4">
                        {/* Welcome Banner */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h1 className="text-3xl font-semibold text-gray-800">
                                Welcome Back, {user.firstname}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Manage your courses, track student progress, and
                                more.
                            </p>
                        </div>

                        {/* Students and Schedule */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* My Students */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                    My Students
                                </h2>
                                <ul className="space-y-1 text-gray-600">
                                    {myStudent.length > 0 ? (
                                        myStudent.map((student) => (
                                            <li key={student.id}>
                                                {student.firstname}{" "}
                                                {student.lastname}
                                            </li>
                                        ))
                                    ) : (
                                        <p className="italic text-sm">
                                            No students found.
                                        </p>
                                    )}
                                </ul>
                            </div>

                            {/* My Schedule */}
                            <div className="bg-white rounded-lg shadow p-4">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                    My Schedule
                                </h2>
                                <ul className="space-y-1 text-gray-600">
                                    {myClasses.length > 0 ? (
                                        myClasses.map((cls) => (
                                            <li key={cls.id}>
                                                <strong>{cls.name}</strong> -{" "}
                                                {cls.schedule}
                                            </li>
                                        ))
                                    ) : (
                                        <p className="italic text-sm">
                                            No schedule found.
                                        </p>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Class Details */}
                        <div className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                My Classes
                            </h2>
                            <ul className="space-y-1 text-gray-600">
                                {myClasses.length > 0 ? (
                                    myClasses.map((cls) => (
                                        <li key={cls.id}>
                                            <span className="font-medium">
                                                {cls.name}
                                            </span>{" "}
                                            - <span>{cls.description}</span> (
                                            {cls.subcode})
                                        </li>
                                    ))
                                ) : (
                                    <p className="italic text-sm">
                                        No classes found.
                                    </p>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Right Sidebar (1/3) */}
                    <div className="flex flex-col gap-4">
                        {/* Calendar */}
                        <div className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Calendar
                            </h2>
                            <Calendar onChange={setDate} value={date} />
                        </div>

                        {/* Tasks */}
                        <div className="bg-white rounded-lg shadow p-4 flex-1">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">
                                Your Tasks
                            </h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <li key={task.id}>
                                            <span className="font-medium">
                                                {task.title}
                                            </span>
                                            {task.description && (
                                                <span className="text-sm text-gray-500">
                                                    {" "}
                                                    – {task.description}
                                                </span>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <p className="italic text-sm text-red-500">
                                        No tasks yet.
                                    </p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
}
