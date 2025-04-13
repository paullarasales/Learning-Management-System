import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Classroom() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("/api/classroom");
                setClasses(response.data);
            } catch (error) {
                console.error("Error fetching classes: ", error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <AdminAuthenticatedLayout>
            <div className="p-4">
                <h1 className="text-xl font-bold mb-4">All Classes</h1>
                <table className="w-full border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border p-2">Class Name</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Instructor ID</th>
                            <th className="border p-2">Students Enrolled</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((cls) => (
                            <tr key={cls.id}>
                                <td className="border p-2">{cls.name}</td>
                                <td className="border p-2">
                                    {cls.description}
                                </td>
                                <td className="border p-2">
                                    {cls.instructor_id}
                                </td>
                                <td className="border p-2">
                                    {cls.students_count}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminAuthenticatedLayout>
    );
}
