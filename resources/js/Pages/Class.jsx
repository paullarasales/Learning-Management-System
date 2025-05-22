import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ classes }) {
    const [selectedClass, setSelectedClass] = useState(null);

    // Handle opening the virtual classroom
    const handleClassClick = (classId) => {
        setSelectedClass(classId);
        // You can use Inertia to navigate to the virtual classroom page
        window.location.href = `/classroom/${classId}`; // Change this route as per your app's structure
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Student Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-white ">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-2xl font-bold text-indigo-800 mb-8">
                                Your Classes
                            </h3>

                            {/* Class Cards */}
                            {classes.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {classes.map((cls) => (
                                        <div
                                            key={cls.id}
                                            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl border border-transparent hover:border-indigo-300 cursor-pointer group"
                                            onClick={() =>
                                                handleClassClick(cls.id)
                                            }
                                        >
                                            {cls.photo && (
                                                <div className="aspect-w-16 aspect-h-9 bg-gray-100 flex items-center justify-center">
                                                    <img
                                                        src={`/class/${cls.photo}`}
                                                        alt={cls.name}
                                                        className="object-contain"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-5 flex flex-col flex-grow">
                                                <h4 className="text-xl font-bold text-indigo-900 mb-1 truncate">
                                                    {cls.name}
                                                </h4>
                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5em]">
                                                    {cls.description ||
                                                        "No description available."}
                                                </p>
                                                <div className="mt-auto space-y-1">
                                                    {cls.instructor && (
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-semibold text-indigo-700">
                                                                Instructor:
                                                            </span>{" "}
                                                            {
                                                                cls.instructor
                                                                    .firstname
                                                            }{" "}
                                                            {
                                                                cls.instructor
                                                                    .lastname
                                                            }
                                                        </p>
                                                    )}
                                                    {cls.subcode && (
                                                        <p className="text-xs text-gray-500 italic">
                                                            Subject Code:{" "}
                                                            {cls.subcode}
                                                        </p>
                                                    )}
                                                    {cls.section && (
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-semibold text-indigo-700">
                                                                Section:
                                                            </span>{" "}
                                                            {cls.section}
                                                        </p>
                                                    )}
                                                    {cls.yearlevel && (
                                                        <p className="text-sm text-gray-700">
                                                            <span className="font-semibold text-indigo-700">
                                                                Year:
                                                            </span>{" "}
                                                            {cls.yearlevel}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center h-64">
                                    <span className="text-lg text-gray-500">
                                        You are not enrolled in any classes yet.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
