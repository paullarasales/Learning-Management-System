import { Link } from "@inertiajs/react";
import InstructorLayout from "@/Layouts/InstructorLayout";

export default function ClassList({ classList }) {
    return (
        <InstructorLayout>
            <div>
                <h2 className="text-xl font-semibold">Your Classes</h2>
                <Link
                    href={route("instructor.create")}
                    className="text-blue-500"
                >
                    + Create New Class
                </Link>
                <ul className="mt-4 space-y-2">
                    {classList && classList.length > 0 ? (
                        classList.map((cls) => (
                            <li
                                key={cls.id}
                                className="border p-2 rounded hover:bg-gray-100"
                            >
                                <Link
                                    href={route(
                                        "instructor.classroom.show",
                                        cls.id
                                    )}
                                    className="text-lg font-bold text-blue-700"
                                >
                                    {cls.name}
                                </Link>
                                <p className="text-sm text-gray-600">
                                    {cls.description}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p>No Classes yet.</p>
                    )}
                </ul>
            </div>
        </InstructorLayout>
    );
}
