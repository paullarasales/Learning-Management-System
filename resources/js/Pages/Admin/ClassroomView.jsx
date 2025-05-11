import { useForm, usePage, router } from "@inertiajs/react";
import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { useState, useEffect } from "react";

export default function ClassroomView({
    classroom = { students: [] },
    students = [],
    initialThreads = [],
}) {
    const { props } = usePage();
    const [activeTab, setActiveTab] = useState("threads");
    const [threads, setThreads] = useState(initialThreads);
    const [materials, setMaterials] = useState(props.materials || []);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [gradingData, setGradingData] = useState({});

    useEffect(() => {
        setThreads(props.initialThreads || []);
    }, [props.initialThreads]);

    const { id: classroomId } = classroom || {};

    useEffect(() => {
        if (selectedAssignment) {
            document
                .getElementById("assignment-details")
                ?.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedAssignment]);

    const {
        data: studentData,
        setData: setStudentData,
        post: postStudent,
        processing: studentProcessing,
        reset: resetStudent,
    } = useForm({ student_id: "" });

    const {
        data: threadData,
        setData: setThreadData,
        post: postThread,
        processing: threadProcessing,
        reset: resetThread,
    } = useForm({ message: "" });

    const {
        data: replyData,
        setData: setReplyData,
        post: postReply,
        processing: replyProcessing,
        reset: resetReply,
    } = useForm({ thread_id: "", message: "" });

    const {
        data: materialData,
        setData: setMaterialData,
        post: postMaterial,
        processing: materialProcessing,
        reset: materialReset,
        progress,
    } = useForm({ title: "", materials_folder: null, class_id: classroom.id });

    const {
        data: assignmentData,
        setData: setAssignmentData,
        post: postAssignment,
        processing: assignmentProcessing,
        reset: resetAssignment,
    } = useForm({
        title: "",
        file: null,
        due_date: "",
        classroom_id: classroomId,
    });

    const handleAddStudent = (e) => {
        e.preventDefault();
        postStudent(route("instructor.classroom.addStudent", classroom.id), {
            onSuccess: () => resetStudent(),
        });
    };

    const handleCreateThread = (e) => {
        e.preventDefault();
        postThread(route("thread.store", classroom.id), {
            onSuccess: () => {
                resetThread();
                setThreads([...props.initialThreads]);
            },
        });
    };

    const handleReplyClick = (threadId) => {
        setReplyData({ ...replyData, thread_id: threadId, message: "" });
    };

    const handleAddMaterial = (e) => {
        e.preventDefault();
        postMaterial(route("materials.store", { classroom: classroom.id }), {
            forceFormDate: true,
            onSuccess: () => {
                materialReset();
                window.location.reload();
            },
            onError: (error) => {
                console.error("Upload error:", errors);
            },
        });
    };

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        postAssignment(
            route("assignments.store", { classroom: classroom.id }),
            {
                forceFormData: true,
                onSuccess: () => {
                    resetAssignment();
                    window.location.reload();
                },
                onError: (errors) => {
                    console.error("Upload failed:", errors);
                },
            }
        );
    };

    const updateGrade = (submissionId) => {
        const data = gradingData[submissionId];
        if (!data) return;

        router.put(`/submissions/${submissionId}/grade`, data, {
            onSuccess: () => {
                toast.success("Grade updated!");
            },
            onError: () => {
                toast.error("Failed to update.");
            },
        });
    };

    return (
        <AdminAuthenticatedLayout>
            <div className="space-y-4">
                <div className="flex space-x-4 border-b mb-4">
                    {["threads", "materials", "assignments", "members"].map(
                        (tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-4 text-sm font-medium capitalize border-b-2 transisition ${
                                    activeTab === tab
                                        ? "border-purple-600 text-purple-600"
                                        : "border-transparent text-gray-500 hover:text-purple-600"
                                }`}
                            >
                                {tab}
                            </button>
                        )
                    )}
                </div>
                <div className="mt-4">
                    {activeTab === "threads" && (
                        <div>
                            <form
                                onSubmit={handleCreateThread}
                                className="mb-6"
                            >
                                <textarea
                                    value={threadData.message}
                                    onChange={(e) =>
                                        setThreadData(
                                            "messsage",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Start a new discussion..."
                                    className="w-full border p-3 rounded-md"
                                    rows="3"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    disabled={threadProcessing}
                                >
                                    Post Thread
                                </button>
                            </form>

                            <div>
                                {threads?.map((thread) => (
                                    <div
                                        key={thread.id}
                                        className="border p-4 rounded-lg bg-white shadow-sm"
                                    >
                                        <div className="flex items-center mb-2">
                                            <span className="flex items-center mb-2">
                                                {thread?.user?.firstname ||
                                                    "Anonymous"}
                                            </span>
                                            <span className="text-gray-400 text-sm ml-2">
                                                {new Date(
                                                    thread.created_at
                                                ).toLocaleDateString()}
                                            </span>
                                            <p className="mb-4">
                                                {thread.message || ""}
                                            </p>

                                            {replyData.thread_id ===
                                                thread.id && (
                                                <form
                                                    onSubmit={(e) =>
                                                        handleCreateReply(
                                                            thread.id
                                                        )
                                                    }
                                                    className="ml-6 mt-4"
                                                >
                                                    <textarea
                                                        value={
                                                            replyData.message
                                                        }
                                                        onChange={(e) =>
                                                            setReplyData(
                                                                "message",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Write your reply..."
                                                        className="w-full border p-2 rounded"
                                                        rows="2"
                                                        required
                                                    />
                                                    <div className="flex space-x-2 mt-2">
                                                        <button
                                                            type="submit"
                                                            className="bg-purple-600 text-white px-3 rounded"
                                                            disabled={
                                                                replyProcessing
                                                            }
                                                        >
                                                            Post Reply
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                resetReply()
                                                            }
                                                            className="bg-gray-200 px-3 py-1 rounded"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                            <button
                                                onClick={() =>
                                                    handleReplyClick(thread.id)
                                                }
                                                className="text-sm text-purple-600 mt-2"
                                            >
                                                Reply
                                            </button>
                                            {thread.replies?.length > 0 && (
                                                <div className="mt-4 ml-6 space-y-4">
                                                    {thread.replies.map(
                                                        (reply) => (
                                                            <div
                                                                key={reply.id}
                                                                className="border-l-2 pl-4 py-2"
                                                            >
                                                                <div className="flex items-center mb-1">
                                                                    <span className="font-semibold">
                                                                        {reply
                                                                            ?.user
                                                                            ?.firstname ||
                                                                            "Anonymous"}
                                                                    </span>
                                                                    <span className="text-gray-400 text-sm ml-2">
                                                                        {new Date(
                                                                            reply.created_at
                                                                        ).toLocaleTimeString()}
                                                                    </span>
                                                                </div>
                                                                <p>
                                                                    {reply?.message ||
                                                                        ""}
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {threads?.length === 0 && (
                                    <p className="text-gray-500">
                                        No discussions threads yet. Start one
                                        above!
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
