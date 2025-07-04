import React from "react";
import { useForm } from "@inertiajs/react";
import InstructorLayout from "@/Layouts/InstructorLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Edit({ classModel }) {
    const { data, setData, put, processing, errors } = useForm({
        name: classModel.name || "",
        description: classModel.description || "",
        subcode: classModel.subcode || "",
        start_time: classModel.start_time || "",
        end_time: classModel.end_time || "",
        yearlevel: classModel.yearlevel || "",
        section: classModel.section || "",
        photo: classModel.photo || null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/instructor/${classModel.id}`);
    };
    return (
        <InstructorLayout>
            <div className="h-form bg-white shadow-md rounded-md p-5">
                <h1 className="text-2xl font-semibold">Edit Class</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="h-full w-full flex flex-col"
                >
                    <div className="h-16 w-full flex items-center justify-end gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                    <div className="h-[500px] w-full flex gap-4">
                        <div className="h-[500px] w-1/2 p-4 flex flex-col gap-1 rounded">
                            <div className="flex-1">
                                {classModel.photo && (
                                    <div className="mb-2">
                                        <img
                                            src={
                                                classModel.photo.startsWith(
                                                    "http"
                                                )
                                                    ? classModel.photo
                                                    : `/class/${classModel.photo}`
                                            }
                                            alt="Current Class Photo"
                                            className="w-full h-48 object-cover border mb-2"
                                        />
                                        <div className="text-md text-gray-500">
                                            Current Photo
                                        </div>
                                    </div>
                                )}
                                <InputLabel
                                    htmlFor="photo"
                                    value="Upload New Photo (Optional)"
                                />
                                <input
                                    type="file"
                                    id="photo"
                                    name="photo"
                                    onChange={(e) =>
                                        setData("photo", e.target.files[0])
                                    }
                                    className="w-full"
                                />
                                <InputError message={errors.photo} />
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
                                        name="start_time"
                                        value={data.start_time}
                                        onChange={(e) =>
                                            setData(
                                                "start_time",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded px-3 py-2"
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
                                        name="end_time"
                                        value={data.end_time}
                                        onChange={(e) =>
                                            setData("end_time", e.target.value)
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    <InputError
                                        message={errors.end_time}
                                        className="text-red-500 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="yearlevel"
                                        value="Year Level"
                                    />
                                    <input
                                        id="yearlevel"
                                        type="number"
                                        name="yearlevel"
                                        value={data.yearlevel}
                                        onChange={(e) =>
                                            setData("yearlevel", e.target.value)
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="section"
                                        value="Section"
                                    />
                                    <input
                                        id="section"
                                        type="text"
                                        name="section"
                                        value={data.section}
                                        onChange={(e) =>
                                            setData("section", e.target.value)
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="h-[500px] w-1/2 p-4 flex flex-col gap-4 rounded">
                            <div>
                                <InputLabel htmlFor="name" value="Class Name" />
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full border rounded px-3 py-2"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="flex gap-2">
                                <div className="flex-1">
                                    {" "}
                                    <InputLabel
                                        htmlFor="description"
                                        value="description"
                                    />
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded p-2"
                                    />
                                    <InputError
                                        message={errors.description}
                                        className="text-red-500 text-xs"
                                    />
                                </div>
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="subcode"
                                        value="Subject Code"
                                    />

                                    <input
                                        id="subcode"
                                        type="text"
                                        name="subcode"
                                        value={data.subcode}
                                        onChange={(e) =>
                                            setData("subcode", e.target.value)
                                        }
                                        className="w-full border rounded p-2 h-subcode"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </InstructorLayout>
    );
}
