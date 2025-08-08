import React, { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Link } from "@inertiajs/react";
import axios from "axios";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <AdminLayout>
            <h1>Students</h1>
            {loading && <div></div>}
            {!loading && students.length === 0 && <div></div>}
            {!loading && students.length > 0 && <div></div>}
        </AdminLayout>
    );
}
