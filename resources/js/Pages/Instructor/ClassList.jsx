import { Link } from "@inertiajs/react";
import InstructorLayout from "@/Layouts/InstructorLayout";

export default function ClassList({ classList }) {
    return (
        <InstructorLayout>
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Your Classes
                        </h2>
                        <Link
                            href={route("instructor.create")}
                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            + Create New Class
                        </Link>
                    </div>

                    {classList && classList.length > 0 ? (
                        <ul className="space-y-4">
                            {classList.map((cls) => (
                                <li
                                    key={cls.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition"
                                >
                                    <Link
                                        href={route(
                                            "instructor.classroom.show",
                                            cls.id
                                        )}
                                        className="text-xl font-bold text-blue-700 hover:underline"
                                    >
                                        {cls.name}
                                    </Link>
                                    <p className="text-gray-600 mt-1">
                                        {cls.description}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">
                            No classes yet. Click "Create New Class" to get
                            started.
                        </p>
                    )}
                </div>
            </div>
        </InstructorLayout>
    );
}
