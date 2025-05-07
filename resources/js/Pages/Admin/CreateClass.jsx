import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function CreateClass({ instructors }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        subcode: "",
        schedule: "",
        instructor_id: "",
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/classroom");
        reset();
    };

    return (
        <AdminAuthenticatedLayout>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-4 max-w-md mx-auto"
            >
                <input
                    type="file"
                    value={data.photo}
                    className="w-full border rounded p-2"
                />
                {errors.photo && (
                    <div className="text-red-500 text-sm">{errors.photo}</div>
                )}
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Class name"
                    className="w-full border rounded p-2"
                />
                {errors.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                )}

                <textarea
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                    placeholder="Description"
                    className="w-full border rounded p-2"
                />
                {errors.description && (
                    <div className="text-red-500 text-sm">
                        {errors.description}
                    </div>
                )}

                <input
                    type="text"
                    value={data.subcode}
                    onChange={(e) => setData("subcode", e.target.value)}
                    placeholder="Subject Code"
                    className="w-full border rounded p-2"
                />
                {errors.subcode && (
                    <div className="text-red-500 text-sm">{errors.subcode}</div>
                )}

                <input
                    type="text"
                    value={data.schedule}
                    onChange={(e) => setData("schedule", e.target.value)}
                    placeholder="Schedule"
                    className="w-full border rounded p-2"
                />
                {errors.schedule && (
                    <div className="text-red-500 text-sm">
                        {errors.schedule}
                    </div>
                )}

                <select
                    value={data.instructor_id}
                    onChange={(e) => setData("instructor_id", e.target.value)}
                    className="w-full border rounded p-2"
                >
                    <option value="">Select Instructor</option>
                    {instructors.map((inst) => (
                        <option key={inst.id} value={inst.id}>
                            {inst.firstname}
                        </option>
                    ))}
                </select>
                {errors.instructor_id && (
                    <div className="text-red-500 text-sm">
                        {errors.instructor_id}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Create Class
                </button>
            </form>
        </AdminAuthenticatedLayout>
    );
}
