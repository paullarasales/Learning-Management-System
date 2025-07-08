import React from "react";
import { useForm } from "@inertiajs/react";
import InstructorLayout from "@/Layouts/InstructorLayout";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Edit({ classModel }) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        delete: destroy,
    } = useForm({
        name: classModel.name || "",
        description: classModel.description || "",
        subcode: classModel.subcode || "",
        start_time: classModel.start_time || undefined,
        end_time: classModel.end_time || undefined,
        yearlevel: classModel.yearlevel || "",
        section: classModel.section || "",
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredData = {};

        // Check if either time is set
        const hasStart =
            typeof data.start_time === "string" &&
            /^\d{2}:\d{2}$/.test(data.start_time);
        const hasEnd =
            typeof data.end_time === "string" &&
            /^\d{2}:\d{2}$/.test(data.end_time);

        Object.entries(data).forEach(([key, value]) => {
            if (key === "photo" && value && typeof value !== "string") {
                filteredData.photo = value;
            } else if (key === "start_time" || key === "end_time") {
                // Only add if both are set and valid
                if (hasStart && hasEnd) {
                    filteredData.start_time = data.start_time;
                    filteredData.end_time = data.end_time;
                }
            } else if (
                key !== "photo" &&
                key !== "start_time" &&
                key !== "end_time" &&
                value !== "" &&
                value !== null &&
                value !== undefined
            ) {
                filteredData[key] = value;
            }
        });

        put(`/instructor/classroom/${classModel.id}`, filteredData, {
            forceFormData: true,
        });
    };

    return (
        <InstructorLayout>
            <div className="h-form bg-white shadow-md rounded-md p-5">
                <div className="flex items-center gap-3">
                    <a href={route("instructor.classList")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                            />
                        </svg>
                    </a>
                    <h1 className="text-2xl font-semibold">Edit Class</h1>
                </div>

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
                        <button
                            type="button"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Are you sure you want to delete this class?"
                                    )
                                ) {
                                    destroy(
                                        `/instructor/classroom/${classModel.id}`
                                    );
                                }
                            }}
                            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                        >
                            Delete
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
                                        setData(
                                            "photo",
                                            e.target.files[0] || null
                                        )
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
                                        value={
                                            data.start_time?.slice(0, 5) || ""
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "start_time",
                                                e.target.value + ":00"
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
                                        value={data.end_time?.slice(0, 5) || ""}
                                        onChange={(e) =>
                                            setData(
                                                "end_time",
                                                e.target.value + ":00"
                                            )
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
