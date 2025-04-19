import { useForm } from "@inertiajs/react";
import InstructorLayout from "@/Layouts/InstructorLayout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/instructor/classes");
    };

    return (
        <InstructorLayout>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold">Create a New Class</h2>

                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {processing ? "Creating..." : "Create Class"}
                </button>
            </form>
        </InstructorLayout>
    );
}
