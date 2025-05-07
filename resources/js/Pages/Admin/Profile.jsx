import React, { useState, useEffect } from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Profile({ auth, user }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        firstname: user.firstname || "",
        middlename: user.middlename || "",
        lastname: user.lastname || "",
        contact_number: user.contact_number || "",
        password: "",
        password_confirmation: "",
        profile_picture: null,
    });

    const [preview, setPreview] = useState(
        user.profile_picture ? `/${user.profile_picture}` : null
    );

    const handleChange = (e) => {
        const key = e.target.name;

        if (key === "profile_picture") {
            const file = e.target.files[0];
            setData("profile_picture", file);
            if (file) {
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setData(key, e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_method", "put");
        formData.append("firstname", data.firstname);
        formData.append("middlename", data.middlename);
        formData.append("lastname", data.lastname);
        formData.append("contact_number", data.contact_number);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);

        if (data.profile_picture) {
            formData.append("profile_picture", data.profile_picture);
        }

        Inertia.post(route("admin.profile.update"), formData, {
            preserveScroll: true,
            onSuccess: () => console.log("Profile updated!"),
        });
    };

    return (
        <AdminAuthenticatedLayout user={auth.user}>
            <Head title="Admin Profile" />

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md space-y-6"
                    encType="multipart/form-data"
                >
                    <div className="flex items-center space-x-4">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Profile Preview"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                No Photo
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Upload New Photo
                            </label>
                            <input
                                type="file"
                                name="profile_picture"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            {errors.profile_picture && (
                                <p className="text-red-500 text-sm">
                                    {errors.profile_picture}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                value={data.firstname}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded"
                            />
                            {errors.firstname && (
                                <p className="text-red-500 text-sm">
                                    {errors.firstname}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                name="middlename"
                                value={data.middlename}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded"
                            />
                            {errors.middlename && (
                                <p className="text-red-500 text-sm">
                                    {errors.middlename}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                value={data.lastname}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded"
                            />
                            {errors.lastname && (
                                <p className="text-red-500 text-sm">
                                    {errors.lastname}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            name="contact_number"
                            value={data.contact_number}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded"
                        />
                        {errors.contact_number && (
                            <p className="text-red-500 text-sm">
                                {errors.contact_number}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">
                                New Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            disabled={processing}
                        >
                            {processing ? "Updating..." : "Update Profile"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminAuthenticatedLayout>
    );
}
