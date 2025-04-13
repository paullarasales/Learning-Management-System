import React from "react";
import { useForm } from "@inertiajs/react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";

export default function EditAccount({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        firstname: user.firstname || "",
        middlename: user.middlename || "",
        lastname: user.lastname || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        specialization: user.specialization || "",
        contact_number: user.contact_number || "",
        profile_picture: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/instructor/${user.id}`);
    };

    return (
        <AdminAuthenticatedLayout>
            <h2 className="text-xl font-bold mb-4">Edit Instructor Account</h2>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-4 max-w-md"
            >
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        value={data.firstname}
                        onChange={(e) => setData("firstname", e.target.value)}
                    />
                    {errors.firstname && <div>{errors.firstname}</div>}
                </div>
                <div>
                    <label>Middle Name</label>
                    <input
                        type="text"
                        value={data.middlename}
                        onChange={(e) => setData("middlename", e.target.value)}
                    />
                    {errors.middlename && <div>{errors.middlename}</div>}
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={data.lastname}
                        onChange={(e) => setData("lastname", e.target.value)}
                    />
                    {errors.lastname && <div>{errors.lastname}</div>}
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors.email && <div>{errors.email}</div>}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    {errors.password && <div>{errors.password}</div>}
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label>Specialization</label>
                    <input
                        type="text"
                        value={data.specialization}
                        onChange={(e) =>
                            setData("specialization", e.target.value)
                        }
                    />
                    {errors.specialization && (
                        <div>{errors.specialization}</div>
                    )}
                </div>
                <div>
                    <label>Contact Number</label>
                    <input
                        type="text"
                        value={data.contact_number}
                        onChange={(e) =>
                            setData("contact_number", e.target.value)
                        }
                    />
                    {errors.contact_number && (
                        <div>{errors.contact_number}</div>
                    )}
                </div>
                <div>
                    <label>Profile Picture</label>
                    <input
                        type="file"
                        onChange={(e) =>
                            setData("profile_picture", e.target.files[0])
                        }
                    />
                    {errors.profile_picture && (
                        <div>{errors.profile_picture}</div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {processing ? "Updating..." : "Update"}
                </button>
            </form>
        </AdminAuthenticatedLayout>
    );
}
