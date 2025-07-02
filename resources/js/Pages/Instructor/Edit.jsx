import React from "react";
import { useForm } from "@inertiajs/react";
import InstructorLayout from "@/Layouts/InstructorLayout";

export default function Edit({ classModel }) {
    const { data, setData, put, processing, errors } = useForm({
        name: classModel.name || "",
        description: classModel.description || "",
        subcode: classModel.subcode || "",
        start_time: classModel.start_time || "",
        end_time: classModel.end_time || "",
        yearlevel: classModel.yearlevel || "",
        section: classModel.section || "",
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/instructor/${classModel.id}`);
    };

    return (
        <InstructorLayout>
            <div className="h-form bg-white shadow-md rounded-md p-5">
                <h1 className="text-2xl font-semibold" Edit Class></h1>
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
                            Save
                        </button>
                    </div>
                    <div className="h-[500px] w-full flex gap-4">
                        <div className="h-[500px] w-1/2 p-4 flex flex-col gap-4 rounded"></div>
                        <div className="h-[500px] w-1/2 p-4 flex flex-col gap-4 rounded"></div>
                    </div>
                </form>
            </div>
        </InstructorLayout>
    );
}
