import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function InstructorRegister() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: "",
        middlename: "",
        lastname: "",
        specialization: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-2/3 h-[83vh] flex rounded-lg overflow-hidden  bg-white">
                <div
                    className="w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/mid.jpg')" }}
                ></div>
                <div className="w-1/2 p-10 flex flex-col justify-center">
                    <Head title="Instructor Register" />
                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <h1>Register as Instructor</h1>
                        <div>
                            <InputLabel
                                htmlFor="firstname"
                                value="First Name"
                            />

                            <TextInput
                                id="firstname"
                                name="firstname"
                                value={data.firstname}
                                className="mt-1 block w-full"
                                autoComplete="firstname"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("firstname", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.firstname}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="middlename"
                                value="Middle Name"
                            />

                            <TextInput
                                id="middlename"
                                name="middlename"
                                value={data.middlename}
                                className="mt-1 block w-full"
                                autoComplete="middlename"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("middlename", e.target.value)
                                }
                                placeholder="Optional"
                            />

                            <InputError
                                message={errors.middlenane}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="lastname" value="Last Name" />

                            <TextInput
                                id="lastname"
                                name="lastname"
                                value={data.lastname}
                                className="mt-1 block w-full"
                                autoComplete="lastname"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("lastname".e.taget.value)
                                }
                            />

                            <InputError
                                message={errors.middlename}
                                claassName="mt-1"
                            />

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="specialization"
                                    value="Specialization"
                                />

                                <TextInput
                                    id="specialization"
                                    name="specialization"
                                    value={data.specialization}
                                    className="mt-1 block w-full"
                                    automComplete="specialization"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "specialization",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.specialization}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                />

                                <TextInput
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("passwprd", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Password Confirmation"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-4"
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-end">
                                <Link
                                    href={route("login")}
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2
                                    focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Already registered?
                                </Link>

                                <PrimaryButton
                                    className="mt-4"
                                    disabled={processing}
                                >
                                    Register
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <a
                            href={route("google.instructor.redirect")}
                            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="mr-2 h-5 w-5"
                            />
                            Continue with Google
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
