import React from "react";
import { useForm } from "@inertiajs/react";
import InstructorLayout from "@/Layouts/InstructorLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        subcode: "",
        start_time: "",
        end_time: "",
        photo: null,
        yearlevel: "",
        section: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/instructor/classes"); // might change later
        reset();
    };

    return (
        <InstructorLayout>
            <div className="h-form bg-white shadow-md rounded-md p-5">
                <h1 className="text-2xl font-semibold">Create New Class</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="h-full w-full flex flex-col"
                >
                    <div className="h-16 w-full flex items-center justify-end gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="text-white bg-blue-500 hover:bg-blue-600 px-4
                        py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                    <div className="h-[500px] w-full flex gap-4">
                        <div className="h-[500px] w-1/2 p-4 flex flex-col gap-4 rounded">
                            <div>
                                <InputLabel
                                    htmlFor="photo"
                                    value="Class Photo"
                                />
                                <input
                                    id="photo"
                                    type="file"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("photo", e.target.files[0])
                                    }
                                />
                                <InputError
                                    message={errors.photo}
                                    className="mt-2"
                                />
                                <div className="mt-2 w-full h-40 border border-solid border-gray-400 rounded flex items-center justify-center overflow-hidden">
                                    {data.photo ? (
                                        <img
                                            src={URL.createObjectURL(
                                                data.photo
                                            )}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-500">
                                            No image selected
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="start_time"
                                        value="Start Time"
                                    />
                                    <input
                                        id="start_time"
                                        type="time"
                                        value={data.start_time}
                                        onChange={(e) =>
                                            setData(
                                                "start_time",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded p-2"
                                    />
                                    <InputError
                                        message={errors.start_time}
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="end_time"
                                        value="End Time"
                                    />
                                    <input
                                        id="end_time"
                                        type="time"
                                        value={data.end_time}
                                        onChange={(e) =>
                                            setData("end_time", e.target.value)
                                        }
                                        className="w-full border rounded p-2"
                                    />
                                    <InputError
                                        message={errors.end_time}
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                            </div>
                            <input
                                type="number"
                                placeholder="Year Level"
                                value={data.yearlevel}
                                onChange={(e) =>
                                    setData("yearlevel", e.target.value)
                                }
                                className="w-full border rounded p-2"
                            />
                            <input
                                type="text"
                                placeholder="Section"
                                value={data.section}
                                onChange={(e) =>
                                    setData("section", e.target.value)
                                }
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div className="h-[500px] w-1/2 p-4 flex flex-col gap-4 rounded">
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Class Name"
                                className="w-full border rounded p-2"
                            />
                            <InputError
                                message={errors.name}
                                className="text-red-500 text-sm"
                            />

                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="Description"
                                className="w-full border rounded p-2"
                            />
                            <InputError
                                message={errors.description}
                                className="text-red-500 text-sm"
                            />

                            <input
                                type="text"
                                value={data.subcode}
                                onChange={(e) =>
                                    setData("subcode", e.target.value)
                                }
                                placeholder="Subject Code"
                                className="w-full border rounded p-2"
                            />
                            <InputError
                                message={errors.subcode}
                                className="text-red-500 text-sm"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </InstructorLayout>
    );
}
