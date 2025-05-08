import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import React from "react";

export default function CreateClass({ instructors }) {
    const { data, setData, post, processing, errors, reset } = useForm({
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
                <div className="col-span-1 md:col-span-2">
                    <InputLabel htmlFor="photo" value="Class Photo" />
                    <input
                        id="photo"
                        type="file"
                        className="mt-1 block w-full"
                        onChange={(e) => setData("photo", e.target.files[0])}
                    />
                    <InputError message={errors.photo} className="mt-2" />
                </div>
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
