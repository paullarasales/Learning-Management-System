import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Instructor({ instructors = [] }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this instructor?")) {
            router.delete(`/instructor/${id}`);
        }
    };

    return (
        <AdminAuthenticatedLayout>
            <Head title="Instructor" />

            <div className="py-4 max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1></h1>
                    <Link
                        href={route("instructor.manage")}
                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                    >
                        + Add New
                    </Link>
                </div>

                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Profile Photo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Specialization
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Contact Number
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {instructors.map((instructor) => (
                                <tr key={instructor.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {instructor.profile_picture ? (
                                            <img
                                                src={`/profiles/${instructor.profile_picture}`}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-400">
                                                N/A
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {instructor.firstname}{" "}
                                        {instructor.middlename}{" "}
                                        {instructor.lastname}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {instructor.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {instructor.specialization ?? "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {instructor.contact_number}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        <Link
                                            href={`/instructor/${instructor.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(instructor.id)
                                            }
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
