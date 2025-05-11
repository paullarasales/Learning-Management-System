import { useForm, usePage, router } from "@inertiajs/react";
import InstructorLayout from "@/Layouts/InstructorLayout";
import { useState, useEffect } from "react";

export default function Classroom({
    classroom = { students: [] },
    students = [],
    initialThreads = [],
}) {
    const { props } = usePage();
    const [activeTab, setActiveTab] = useState("threads");
    const [threads, setThreads] = useState(initialThreads);
    const [materials, setMaterials] = useState(props.materials || []);
    const [gradingData, setGradingData] = useState({});

    // Update threads when props change
    useEffect(() => {
        setThreads(props.initialThreads || []);
    }, [props.initialThreads]);

    const { id: classroomId } = classroom || {};

    const [selectedAssignment, setSelectedAssignment] = useState(null);

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
        classroom_id: classroomId, // Ensure classroomId is available
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

    const handleCreateReply = (threadId, e) => {
        e.preventDefault();
        postReply(route("thread.reply", threadId), {
            onSuccess: () => {
                resetReply();
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
            forceFormData: true,
            onSuccess: () => {
                console.log("Uploaded successfully!");
                materialReset();
                window.location.reload();
            },
            onError: (errors) => {
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
                    console.log("Assignment uploaded!");
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
                toast.error("Failed to upadate");
            },
        });
    };

    return (
        <InstructorLayout>
            <div className="space-y-4">
                {/* Header */}
                <div className="border-b pb-4 mb-4">
                    <h1 className="text-3xl font-semibold text-purple-700">
                        {classroom?.name || "Classroom"}
                    </h1>
                    <p className="text-gray-600">
                        {classroom?.description || ""}
                    </p>
                </div>

                {/* Tab Buttons */}
                <div className="flex space-x-4 border-b mb-4">
                    {["threads", "materials", "assignments", "members"].map(
                        (tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-4 text-sm font-medium capitalize border-b-2 transition ${
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

                {/* Tab Content */}
                <div className="mt-4">
                    {/* THREADS */}
                    {activeTab === "threads" && (
                        <div>
                            {/* Create Thread */}
                            <form
                                onSubmit={handleCreateThread}
                                className="mb-6"
                            >
                                <textarea
                                    value={threadData.message}
                                    onChange={(e) =>
                                        setThreadData("message", e.target.value)
                                    }
                                    placeholder="Start a new discussion..."
                                    className="w-full border p-3 rounded"
                                    rows="3"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
                                    disabled={threadProcessing}
                                >
                                    Post Thread
                                </button>
                            </form>

                            {/* Threads List */}
                            <div className="space-y-6">
                                {threads?.map((thread) => (
                                    <div
                                        key={thread.id}
                                        className="border p-4 rounded-lg bg-white shadow-sm"
                                    >
                                        <div className="flex items-center mb-2">
                                            <span className="font-semibold">
                                                {thread?.user?.firstname ||
                                                    "Anonymous"}
                                            </span>
                                            <span className="text-gray-400 text-sm ml-2">
                                                {new Date(
                                                    thread.created_at
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="mb-4">
                                            {thread?.message || ""}
                                        </p>

                                        {/* Reply Form */}
                                        {replyData.thread_id === thread.id && (
                                            <form
                                                onSubmit={(e) =>
                                                    handleCreateReply(
                                                        thread.id,
                                                        e
                                                    )
                                                }
                                                className="ml-6 mt-4"
                                            >
                                                <textarea
                                                    value={replyData.message}
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
                                                        className="bg-purple-600 text-white px-3 py-1 rounded"
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

                                        {/* Replies */}
                                        {thread.replies?.length > 0 && (
                                            <div className="mt-4 ml-6 space-y-4">
                                                {thread.replies.map((reply) => (
                                                    <div
                                                        key={reply.id}
                                                        className="border-l-2 pl-4 py-2"
                                                    >
                                                        <div className="flex items-center mb-1">
                                                            <span className="font-semibold">
                                                                {reply?.user
                                                                    ?.firstname ||
                                                                    "Anonymous"}
                                                            </span>
                                                            <span className="text-gray-400 text-sm ml-2">
                                                                {new Date(
                                                                    reply.created_at
                                                                ).toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <p>
                                                            {reply?.message ||
                                                                ""}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {threads?.length === 0 && (
                                    <p className="text-gray-500">
                                        No discussion threads yet. Start one
                                        above!
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "materials" && (
                        <div>
                            {/* Upload Form */}
                            <form
                                onSubmit={handleAddMaterial}
                                encType="multipart/form-data"
                                className="mb-6 space-y-4"
                            >
                                <div>
                                    <label className="block font-semibold mb-1">
                                        Material Title
                                    </label>
                                    <input
                                        type="text"
                                        value={materialData.title}
                                        onChange={(e) =>
                                            setMaterialData(
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border p-3 rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">
                                        Upload Material
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setMaterialData(
                                                "materials_folder",
                                                e.target.files[0]
                                            )
                                        }
                                        className="w-full border p-3 rounded"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
                                    disabled={materialProcessing}
                                >
                                    {materialProcessing
                                        ? "Uploading..."
                                        : "Upload"}
                                </button>
                            </form>
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold">
                                    Uploaded Materials
                                </h2>
                                {materials.length === 0 ? (
                                    <p className="text-gray-500">
                                        No materials uploaded yet.
                                    </p>
                                ) : (
                                    <ul className="space-y-2">
                                        {materials.map((material) => (
                                            <li
                                                key={material.id}
                                                className="border p-4 rounded shadow-sm bg-white"
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-medium">
                                                            {material.title}
                                                        </h3>
                                                        <a
                                                            href={`/materials/${material.materials_folder}`}
                                                            target="_blank"
                                                        >
                                                            View/Download
                                                        </a>
                                                    </div>
                                                    <span className="text-sm text-gray-400">
                                                        {new Date(
                                                            material.created_at
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "assignments" && (
                        <div>
                            {/* Upload Assignment Form */}
                            <form
                                onSubmit={handleCreateAssignment}
                                encType="multipart/form-data"
                                className="mb-6 space-y-4"
                            >
                                <div>
                                    <label className="block font-semibold mb-1">
                                        Assignment Title
                                    </label>
                                    <input
                                        type="text"
                                        value={assignmentData.title}
                                        onChange={(e) =>
                                            setAssignmentData(
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border p-3 rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">
                                        Upload Assignment File
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setAssignmentData(
                                                "file",
                                                e.target.files[0]
                                            )
                                        }
                                        className="w-full border p-3 rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold mb-1">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        value={assignmentData.due_date}
                                        onChange={(e) =>
                                            setAssignmentData(
                                                "due_date",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border p-3 rounded"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
                                    disabled={assignmentProcessing}
                                >
                                    {assignmentProcessing
                                        ? "Uploading..."
                                        : "Upload Assignment"}
                                </button>
                            </form>

                            {/* Assignment List */}
                            {props.assignments?.length > 0 && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">
                                        Uploaded Assignments
                                    </h2>
                                    <ul className="space-y-2">
                                        {props.assignments.map((assignment) => (
                                            <li
                                                key={assignment.id}
                                                className="border p-4 rounded shadow-sm bg-white cursor-pointer"
                                                onClick={() =>
                                                    setSelectedAssignment(
                                                        assignment
                                                    )
                                                }
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-medium">
                                                            {assignment.title}
                                                        </h3>
                                                        <p className="text-purple-600">
                                                            Click to view
                                                            details
                                                        </p>
                                                    </div>
                                                    <span className="text-sm text-gray-400">
                                                        {new Date(
                                                            assignment.created_at
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Assignment Details Section */}
                            {selectedAssignment && (
                                <div
                                    id="assignment-details"
                                    className="mt-8 border-t pt-4 space-y-4"
                                >
                                    <h2 className="text-2xl font-bold text-purple-700">
                                        Assignment Details
                                    </h2>
                                    <p>
                                        <strong>Title:</strong>{" "}
                                        {selectedAssignment.title}
                                    </p>
                                    <p>
                                        <strong>Due Date:</strong>{" "}
                                        {new Date(
                                            selectedAssignment.due_date
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Created At:</strong>{" "}
                                        {new Date(
                                            selectedAssignment.created_at
                                        ).toLocaleString()}
                                    </p>

                                    {/* Submissions List */}
                                    {selectedAssignment.submissions.map(
                                        (submission) => (
                                            <li
                                                key={submission.id}
                                                className="border rounded p-4 bg-white shadow-sm"
                                            >
                                                <div className="flex justify-between items-start gap-4 flex-wrap">
                                                    <div className="flex-1">
                                                        <p className="font-medium">
                                                            {
                                                                submission
                                                                    .student
                                                                    ?.name
                                                            }
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Submission ID:{" "}
                                                            {submission.id}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Grade:{" "}
                                                            <input
                                                                type="text"
                                                                defaultValue={
                                                                    submission.grade ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    setGradingData(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            [submission.id]:
                                                                                {
                                                                                    ...prev[
                                                                                        submission
                                                                                            .id
                                                                                    ],
                                                                                    grade: e
                                                                                        .target
                                                                                        .value,
                                                                                },
                                                                        })
                                                                    )
                                                                }
                                                                className="border p-1 w-24 rounded"
                                                            />
                                                        </p>
                                                        <p className="text-sm text-gray-600 mt-2">
                                                            Feedback:
                                                            <textarea
                                                                defaultValue={
                                                                    submission.feedback ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    setGradingData(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            [submission.id]:
                                                                                {
                                                                                    ...prev[
                                                                                        submission
                                                                                            .id
                                                                                    ],
                                                                                    feedback:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                },
                                                                        })
                                                                    )
                                                                }
                                                                className="border w-full p-1 rounded mt-1"
                                                                rows={2}
                                                            />
                                                        </p>
                                                        <button
                                                            onClick={() =>
                                                                updateGrade(
                                                                    submission.id
                                                                )
                                                            }
                                                            className="mt-2 px-3 py-1 bg-purple-600 text-white rounded text-sm"
                                                        >
                                                            Save Grade
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <a
                                                            href={`/submissions/${submission.assignment_folder}`}
                                                            target="_blank"
                                                            className="text-purple-600 underline"
                                                        >
                                                            View Submission
                                                        </a>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "members" && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">
                                Class Members
                            </h2>

                            {/* Add Student Form */}
                            <form
                                onSubmit={handleAddStudent}
                                className="flex space-x-4 mb-6"
                            >
                                <select
                                    value={studentData.student_id}
                                    onChange={(e) =>
                                        setStudentData(
                                            "student_id",
                                            e.target.value
                                        )
                                    }
                                    className="border px-3 py-2 rounded w-1/2"
                                    required
                                >
                                    <option value="">
                                        Select a student to add
                                    </option>
                                    {students.map((student) => (
                                        <option
                                            key={student.id}
                                            value={student.id}
                                        >
                                            {student.firstname}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="submit"
                                    disabled={studentProcessing}
                                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                                >
                                    Add Student
                                </button>
                            </form>

                            {/* List of Current Students */}
                            <ul className="space-y-2">
                                {classroom.students.length > 0 ? (
                                    classroom.students.map((student) => (
                                        <li
                                            key={student.id}
                                            className="border px-4 py-2 rounded bg-gray-50"
                                        >
                                            {student.firstname}
                                        </li>
                                    ))
                                ) : (
                                    <li>No students yet.</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </InstructorLayout>
    );
}
