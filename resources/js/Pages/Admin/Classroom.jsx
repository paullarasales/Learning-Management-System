import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Classroom() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState("All");

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

    const filteredClasses =
        selectedYear === "All"
            ? classes
            : classes.filter((cls) => cls.yearlevel === Number(selectedYear));

    return (
        <AdminAuthenticatedLayout>
            <div className="min-h-screen p-4">
                {/* Filter */}
                <div className="mb-6">
                    <label
                        htmlFor="yearFilter"
                        className="mr-2 text-xl font-medium"
                    >
                        Filter by Year Level:
                    </label>
                    <select
                        id="yearFilter"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1"
                    >
                        <option value="All">All</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                </div>

                {/* Output */}
                {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : filteredClasses.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No classes found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredClasses.map((cls) => (
                            <Link
                                key={cls.id}
                                href={route("admin.classroom.show", cls.id)}
                            >
                                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-container flex flex-col">
                                    <img
                                        src={`/class/${cls.photo}`}
                                        alt={cls.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4 flex-grow">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                            {cls.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {cls.description ||
                                                "No description available."}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Instructor:</strong>{" "}
                                            {cls.instructor
                                                ? `${cls.instructor.firstname} ${cls.instructor.lastname}`
                                                : "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Year & Section:</strong>{" "}
                                            {cls.yearlevel} - {cls.section}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Students Enrolled:</strong>{" "}
                                            {cls.students_count}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AdminAuthenticatedLayout>
    );
}
