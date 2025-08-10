import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("/api/students");
                console.log(response.data.students);
                setStudents(response.data.students);
            } catch (error) {
                console.error("Error fetching students: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
        const interval = setInterval(fetchStudents, 1000);
        return () => clearInterval(interval);
    }, []);

    const openModal = (studentId) => {
        setSelectedStudent(studentId);
        setNewPassword("");
        setShowModal(true);
    };

    const handleResetPassword = async () => {
        try {
            await axios.put(`/student/${selectedStudent}/reset`, {
                password: newPassword,
            });
            alert("Password reset successfully!");
            setShowModal(false);
        } catch (error) {
            console.error("Error resetting password: ", error);
        }
    };

    return (
        <AdminLayout>
            <h1>Students</h1>
            {loading && <div></div>}
            {!loading && students.length === 0 && (
                <div>
                    <h1>No Students</h1>
                </div>
            )}
            {!loading && students.length > 0 && (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-h-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    First Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Middle Name
                                </th>
                                <th className="px-6 px-3 text-left text-xs font-medium">
                                    Last Name
                                </th>
                                <th className="px-6 px-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Email
                                </th>
                                <th className="px-6 px-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {student.firstname}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {student.middlename}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {student.lastname}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {student.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() =>
                                                openModal(student.id)
                                            }
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md"
                                        >
                                            Reset Password
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold">Reset Password</h2>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-2 w-full"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleResetPassword}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
