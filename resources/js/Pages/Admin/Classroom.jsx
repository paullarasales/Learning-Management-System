import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Classroom() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("/api/classroom");
                setClasses(response.data);
            } catch (error) {
                console.error("Error fetching classes: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    return (
        <AdminAuthenticatedLayout>
            <div className="p-6">
                {/* <h2 className="text-2xl font-semibold mb-4">Classroom List</h2> */}

                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : classes.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No classes found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {classes.map((cls) => (
                            <div
                                key={cls.id}
                                className="border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-lg transition-shadow bg-white"
                            >
                                <h3 className="text-lg font-bold mb-1 text-blue-700">
                                    {cls.name}
                                </h3>
                                <p className="text-gray-600 mb-2">
                                    {cls.description ||
                                        "No description available."}
                                </p>

                                <div className="text-sm text-gray-700">
                                    <strong>Instructor:</strong>{" "}
                                    {cls.instructor
                                        ? `${cls.instructor.firstname} ${cls.instructor.lastname}`
                                        : "N/A"}
                                </div>

                                <div className="text-sm text-gray-700 mt-1">
                                    <strong>Students Enrolled:</strong>{" "}
                                    {cls.students_count}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminAuthenticatedLayout>
    );
}
