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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-bold mb-6">
                                Your Classes
                            </h3>

                            {/* Class Cards */}
                            {classes.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {classes.map((cls) => (
                                        <div
                                            key={cls.id}
                                            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200 ease-in-out cursor-pointer"
                                            onClick={() =>
                                                handleClassClick(cls.id)
                                            }
                                        >
                                            <div className="p-6">
                                                <h4 className="text-xl font-semibold text-gray-800 truncate">
                                                    {cls.name}
                                                </h4>
                                                <p className="text-sm text-gray-600 mt-2">
                                                    {cls.description}
                                                </p>
                                                <p className="text-sm mt-4">
                                                    <span className="font-medium">
                                                        Instructor:
                                                    </span>{" "}
                                                    {cls.instructor?.firstname}{" "}
                                                    {cls.instructor?.lastname}
                                                </p>
                                                <p className="text-xs text-gray-500 italic mt-1">
                                                    Subject Code: {cls.subcode}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">
                                    You are not enrolled in any classes yet.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
