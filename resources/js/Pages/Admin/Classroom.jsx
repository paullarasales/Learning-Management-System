import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Classroom() {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

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

    // Reset to first page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedYear]);

    const filteredClasses =
        selectedYear === "All"
            ? classes
            : classes.filter((cls) => cls.yearlevel === Number(selectedYear));

    // Pagination logic
    const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
    const paginatedClasses = filteredClasses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <AdminAuthenticatedLayout>
            <div className="min-h-screen bg-white p-6">
                {/* Filter */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-3xl font-bold text-indigo-800 tracking-tight">
                        Classrooms
                    </h1>
                    <div className="flex items-center gap-2">
                        <label
                            htmlFor="yearFilter"
                            className="text-lg font-medium text-gray-700"
                        >
                            Filter by Year:
                        </label>
                        <select
                            id="yearFilter"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                        >
                            <option value="All">All</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                        </select>
                    </div>
                </div>

                {/* Output */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="text-lg text-gray-500 animate-pulse">
                            Loading...
                        </span>
                    </div>
                ) : filteredClasses.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="text-lg text-gray-500">
                            No classes found.
                        </span>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {paginatedClasses.map((cls) => (
                                <Link
                                    key={cls.id}
                                    href={route("admin.classroom.show", cls.id)}
                                    className="group"
                                >
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transform transition duration-300 hover:-translate-y-1 hover:shadow-2xl border border-transparent hover:border-indigo-300">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                src={`/class/${cls.photo}`}
                                                alt={cls.name}
                                                className="object-contain"
                                            />
                                        </div>

                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-indigo-900 mb-1 truncate">
                                                {cls.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5em]">
                                                {cls.description ||
                                                    "No description available."}
                                            </p>
                                            <div className="mt-auto space-y-1">
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-semibold text-indigo-700">
                                                        Instructor:
                                                    </span>{" "}
                                                    {cls.instructor
                                                        ? `${cls.instructor.firstname} ${cls.instructor.lastname}`
                                                        : "N/A"}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-semibold text-indigo-700">
                                                        Year & Section:
                                                    </span>{" "}
                                                    {cls.yearlevel} -{" "}
                                                    {cls.section}
                                                </p>
                                                <p className="text-sm text-gray-700">
                                                    <span className="font-semibold text-indigo-700">
                                                        Students Enrolled:
                                                    </span>{" "}
                                                    {cls.students_count}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-8 gap-2">
                            <button
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(p - 1, 1))
                                }
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded bg-indigo-100 text-indigo-700 disabled:opacity-50"
                            >
                                Prev
                            </button>
                            {[...Array(totalPages)].map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentPage(idx + 1)}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === idx + 1
                                            ? "bg-indigo-600 text-white"
                                            : "bg-indigo-100 text-indigo-700"
                                    }`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                            <button
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(p + 1, totalPages)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded bg-indigo-100 text-indigo-700 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </AdminAuthenticatedLayout>
    );
}
