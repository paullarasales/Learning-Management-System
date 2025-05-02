import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import { useState } from "react";

export default function Dashboard({
    student,
    classes,
    assignments,
    tasks = [],
}) {
    const [date, setDate] = useState(new Date());

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    🎓 Student Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex min-h-screen space-x-4 p-4">
                {/* Left */}
                <div className="w-2/3 text-white flex flex-col items-center justify-center gap-2">
                    <div className="h-[200px] w-full bg-white rounded-md flex justify-around p-4">
                        {/* Left Content */}
                        <div className="flex flex-col items-start p-6 w-3/4 h-full gap-2">
                            <h1 className="text-5xl text-black font-bold tracking-wide">
                                Learning is Fun!
                            </h1>
                            <p className="text-gray-500">
                                Learn fun anywhere and anytime without any time
                                limit just through the application.
                            </p>
                        </div>

                        {/* Right Image */}
                        <div className="w-1/3 h-full">
                            <img
                                src="/dashboard/studying.jpeg"
                                alt="Studying Illustration"
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    </div>

                    <div className="h-3/4 w-full bg-white grid grid-cols-2 grid-rows-2 gap-6 p-6 rounded-md">
                        {classes.length > 0 ? (
                            classes.slice(0, 4).map((cls) => (
                                <div
                                    key={cls.id}
                                    className="bg-white w-full h-full rounded-lg shadow-md p-6 flex flex-col justify-between"
                                >
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 truncate">
                                            {cls.name}
                                        </h3>
                                        <p className="text-md text-gray-600 mt-2">
                                            Instructor:{" "}
                                            <span className="font-semibold">
                                                {cls.instructor?.firstname}{" "}
                                                {cls.instructor?.lastname}
                                            </span>
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-500 italic mt-4">
                                        Subject Code: {cls.subcode}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-white italic col-span-2">
                                You are not enrolled in any classes yet.
                            </p>
                        )}
                    </div>
                </div>

                {/* Right */}
                <div className="w-1/3  p-4 text-gray-900 bg-white">
                    <h3 className="text-lg font-semibold mb-4">📅 Calendar</h3>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="rounded-lg overflow-hidden"
                    />
                    {/* Taks Read Only */}
                    <div className="mt-5">
                        <h4 className="text-md font-semibold mb-2">
                            📝 Your Tasks
                        </h4>
                        <ul className="flex flex-col gap-5 list-disc list-inside text-md">
                            {tasks.length > 0 ? (
                                tasks.map((task) => (
                                    <li key={task.id}>
                                        <span className="font-medium">
                                            {task.title}
                                        </span>
                                        {task.description && (
                                            <span className="text-gray-600">
                                                {" "}
                                                – {task.description}
                                            </span>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">
                                    No tasks yet.
                                </p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
