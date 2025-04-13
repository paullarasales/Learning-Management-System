import React from "react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Profile({ auth, user }) {
    return (
        <AdminAuthenticatedLayout user={auth.user}>
            <Head title="Admin Profile" />

            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-2xl font-bold mb-4">Admin Profile</h1>
                <div className="bg-white p-6 shadow rounded-lg">
                    <div className="flex items-center space-x-4 mb-4">
                        {user.profile_picture ? (
                            <img
                                src={`/storage/${user.profile_picture}`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                No Photo
                            </div>
                        )}
                        <div>
                            <p>
                                <strong>Name:</strong> {user.firstname}{" "}
                                {user.middlename} {user.lastname}
                            </p>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Contact:</strong> {user.contact_number}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
