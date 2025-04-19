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
                            <h3 className="text-lg font-bold mb-4">
                                Your Classes
                            </h3>
                            {classes.length > 0 ? (
                                <ul className="space-y-2">
                                    {classes.map((cls) => (
                                        <li
                                            key={cls.id}
                                            className="border p-4 rounded shadow-sm bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                                            onClick={() =>
                                                handleClassClick(cls.id)
                                            }
                                        >
                                            <h4 className="text-lg font-semibold">
                                                {cls.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {cls.description}
                                            </p>
                                            <p className="text-sm mt-2">
                                                Instructor:{" "}
                                                <span className="font-medium">
                                                    {cls.instructor?.firstname}{" "}
                                                    {cls.instructor?.lastname}
                                                </span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>You are not enrolled in any classes yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
