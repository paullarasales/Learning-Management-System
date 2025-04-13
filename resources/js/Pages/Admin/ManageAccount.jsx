import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function ManageAccount() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: "",
        middlename: "",
        lastname: "",
        email: "",
        password: "",
        password_confirmation: "",
        specialization: "",
        contact_number: "",
        profile_picture: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("instructor.store"), {
            forceFormData: true, // Important for file uploads
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminAuthenticatedLayout>
            <Head title="Manage Account" />

            <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-6">
                <h2 className="text-xl font-bold mb-4">
                    Create Instructor Account
                </h2>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div>
                        <InputLabel htmlFor="firstname" value="First Name" />
                        <TextInput
                            id="firstname"
                            type="text"
                            value={data.firstname}
                            onChange={(e) =>
                                setData("firstname", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.firstname}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="middlename" value="Middle Name" />
                        <TextInput
                            id="middlename"
                            type="text"
                            value={data.middlename}
                            onChange={(e) =>
                                setData("middlename", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.middlename}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="lastname" value="Last Name" />
                        <TextInput
                            id="lastname"
                            type="text"
                            value={data.lastname}
                            onChange={(e) =>
                                setData("lastname", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.lastname}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="specialization"
                            value="Specialization"
                        />
                        <TextInput
                            id="specialization"
                            type="text"
                            value={data.specialization}
                            onChange={(e) =>
                                setData("specialization", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.specialization}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="contact_number"
                            value="Contact Number"
                        />
                        <TextInput
                            id="contact_number"
                            type="text"
                            value={data.contact_number}
                            onChange={(e) =>
                                setData("contact_number", e.target.value)
                            }
                            className="mt-1 block w-full"
                        />
                        <InputError
                            message={errors.contact_number}
                            className="mt-2"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <InputLabel
                            htmlFor="profile_picture"
                            value="Profile Photo"
                        />
                        <input
                            id="profile_picture"
                            type="file"
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("profile_picture", e.target.files[0])
                            }
                        />
                        <InputError
                            message={errors.profile_picture}
                            className="mt-2"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 mt-4">
                        <PrimaryButton disabled={processing}>
                            Create Account
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AdminAuthenticatedLayout>
    );
}
