import { useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";

export default function Classroom({ classroom = {}, initialThreads = [] }) {
    const { props } = usePage();
    const [activeTab, setActiveTab] = useState("threads");
    const [threads, setThreads] = useState(initialThreads);
    const [materials, setMaterials] = useState(props.materials || []);
    const [assignments, setAssignments] = useState(props.assignments || []);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [file, setFile] = useState(null);
    const { submissions = [] } = usePage().props;

    const now = new Date();

    // Get IDs of completed assignments
    const completedSubmissionIds = submissions
        .filter((sub) => sub.status === "completed")
        .map((sub) => sub.assignment_id);

    // Ongoing = due in the future AND not completed
    const ongoingAssignments = assignments.filter(
        (a) =>
            new Date(a.due_date) >= now &&
            !completedSubmissionIds.includes(a.id)
    );

    // Past Due = due in the past AND not completed
    const pastDueAssignments = assignments.filter(
        (a) =>
            new Date(a.due_date) < now && !completedSubmissionIds.includes(a.id)
    );

    // Completed assignments = joined with completed submissions
    const completedAssignments = submissions
        .filter((sub) => sub.status === "completed")
        .map((sub) => assignments.find((a) => a.id === sub.assignment_id))
        .filter(Boolean); // ensure valid assignments only

    useEffect(() => {
        setThreads(props.initialThreads || []);
    }, [props.initialThreads]);

    // Thread form
    const {
        data: threadData,
        setData: setThreadData,
        post: postThread,
        processing: threadProcessing,
        reset: resetThread,
    } = useForm({ message: "" });

    // Reply form
    const {
        data: replyData,
        setData: setReplyData,
        post: postReply,
        processing: replyProcessing,
        reset: resetReply,
    } = useForm({ thread_id: "", message: "" });

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
        setReplyData({ thread_id: threadId, message: "" });
    };

    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="border-b pb-4 mb-6">
                    <h1 className="text-3xl font-bold text-purple-700">
                        {classroom?.name || "Classroom"}
                    </h1>
                    <p className="text-gray-600">
                        {classroom?.description || ""}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex space-x-6 mb-4 border-b">
                    {["threads", "materials", "assignments"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-2 px-4 text-sm font-semibold border-b-2 ${
                                activeTab === tab
                                    ? "border-purple-600 text-purple-600"
                                    : "border-transparent text-gray-500 hover:text-purple-600"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="mt-4 space-y-6">
                    {activeTab === "threads" && (
                        <>
                            {/* Create Thread */}
                            <form
                                onSubmit={handleCreateThread}
                                className="space-y-3"
                            >
                                <textarea
                                    value={threadData.message}
                                    onChange={(e) =>
                                        setThreadData("message", e.target.value)
                                    }
                                    placeholder="Start a new discussion..."
                                    className="w-full border p-3 rounded resize-none"
                                    rows={3}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                                    disabled={threadProcessing}
                                >
                                    Start Discussion
                                </button>
                            </form>

                            {/* Threads List */}
                            {threads.length > 0 ? (
                                <div className="space-y-6">
                                    {threads.map((thread) => (
                                        <div
                                            key={thread.id}
                                            className="border p-4 rounded-lg shadow bg-white"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div>
                                                    <span className="font-semibold">
                                                        {thread?.user
                                                            ?.firstname ||
                                                            "Anonymous"}
                                                    </span>
                                                    <span className="ml-2 text-gray-400 text-sm">
                                                        {new Date(
                                                            thread.created_at
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-gray-800">
                                                {thread.message}
                                            </p>

                                            {/* Reply Button */}
                                            <button
                                                onClick={() =>
                                                    handleReplyClick(thread.id)
                                                }
                                                className="text-sm text-purple-600 mt-2"
                                            >
                                                Reply
                                            </button>

                                            {/* Reply Form */}
                                            {replyData.thread_id ===
                                                thread.id && (
                                                <form
                                                    onSubmit={(e) =>
                                                        handleCreateReply(
                                                            thread.id,
                                                            e
                                                        )
                                                    }
                                                    className="mt-4 space-y-2"
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
                                                        className="w-full border p-2 rounded resize-none"
                                                        rows={2}
                                                        required
                                                    />
                                                    <div className="flex gap-2">
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
                                                            onClick={resetReply}
                                                            className="bg-gray-300 px-3 py-1 rounded"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            )}

                                            {/* Replies */}
                                            {thread.replies?.length > 0 && (
                                                <div className="mt-4 space-y-3 pl-4 border-l-2">
                                                    {thread.replies.map(
                                                        (reply) => (
                                                            <div key={reply.id}>
                                                                <div className="flex items-center text-sm mb-1">
                                                                    <span className="font-semibold">
                                                                        {reply
                                                                            ?.user
                                                                            ?.firstname ||
                                                                            "Anonymous"}
                                                                    </span>
                                                                    <span className="ml-2 text-gray-400">
                                                                        {new Date(
                                                                            reply.created_at
                                                                        ).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm">
                                                                    {
                                                                        reply.message
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center">
                                    No threads yet. Be the first to post!
                                </p>
                            )}
                        </>
                    )}

                    {activeTab === "materials" && (
                        <>
                            <h2 className="text-xl font-semibold">
                                Class Materials
                            </h2>
                            {materials.length > 0 ? (
                                <ul className="space-y-3">
                                    {materials.map((material) => (
                                        <li
                                            key={material.id}
                                            className="p-4 border rounded-lg bg-white shadow"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-medium">
                                                        {material.title}
                                                    </h3>
                                                    <a
                                                        href={`/materials/${material.materials_folder}`}
                                                        target="_blank"
                                                        className="text-purple-600 hover:underline text-sm"
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
                            ) : (
                                <p className="text-gray-500 text-center">
                                    No materials uploaded yet.
                                </p>
                            )}
                        </>
                    )}
                    {/*
                     {/* Assignment Section */}
                    {activeTab === "assignments" && (
                        <>
                            <h2 className="text-xl font-semibold mb-4">
                                Assignments
                            </h2>

                            {/* Ongoing Assignments */}
                            <div>
                                <h3 className="text-lg font-bold text-green-600 mb-2">
                                    Ongoing
                                </h3>
                                {ongoingAssignments.length > 0 ? (
                                    <ul className="space-y-4 mb-6">
                                        {ongoingAssignments.map(
                                            (assignment) => {
                                                const submission =
                                                    submissions.find(
                                                        (sub) =>
                                                            sub.assignment_id ===
                                                            assignment.id
                                                    );

                                                return (
                                                    <li
                                                        key={assignment.id}
                                                        className="border rounded-lg p-4 bg-white shadow cursor-pointer"
                                                        onClick={() =>
                                                            setSelectedAssignment(
                                                                assignment
                                                            )
                                                        }
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <h3 className="font-semibold">
                                                                    {
                                                                        assignment.title
                                                                    }
                                                                </h3>
                                                                <p className="text-sm text-gray-500">
                                                                    Due:{" "}
                                                                    {new Date(
                                                                        assignment.due_date
                                                                    ).toLocaleDateString()}
                                                                </p>
                                                                {submission?.grade && (
                                                                    <p className="text-sm text-green-600 mt-1">
                                                                        Grade:{" "}
                                                                        {
                                                                            submission.grade
                                                                        }
                                                                    </p>
                                                                )}
                                                                {submission?.feedback && (
                                                                    <p className="text-sm text-blue-600 mt-1">
                                                                        Feedback:{" "}
                                                                        {
                                                                            submission.feedback
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <span className="text-purple-600 text-sm">
                                                                View & Submit →
                                                            </span>
                                                        </div>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 text-center mb-6">
                                        No ongoing assignments.
                                    </p>
                                )}
                            </div>

                            {/* Past Due Assignments */}
                            <div>
                                <h3 className="text-lg font-bold text-red-600 mb-2">
                                    Past Due
                                </h3>
                                {pastDueAssignments.length > 0 ? (
                                    <ul className="space-y-4">
                                        {pastDueAssignments.map(
                                            (assignment) => {
                                                const submission =
                                                    submissions.find(
                                                        (sub) =>
                                                            sub.assignment_id ===
                                                            assignment.id
                                                    );

                                                return (
                                                    <li
                                                        key={assignment.id}
                                                        className="border rounded-lg p-4 bg-gray-100 shadow cursor-pointer"
                                                        onClick={() =>
                                                            setSelectedAssignment(
                                                                assignment
                                                            )
                                                        }
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <h3 className="font-semibold">
                                                                    {
                                                                        assignment.title
                                                                    }
                                                                </h3>
                                                                <p className="text-sm text-gray-500">
                                                                    Due:{" "}
                                                                    {new Date(
                                                                        assignment.due_date
                                                                    ).toLocaleDateString()}
                                                                </p>
                                                                {submission?.grade && (
                                                                    <p className="text-sm text-green-600 mt-1">
                                                                        Grade:{" "}
                                                                        {
                                                                            submission.grade
                                                                        }
                                                                    </p>
                                                                )}
                                                                {submission?.feedback && (
                                                                    <p className="text-sm text-blue-600 mt-1">
                                                                        Feedback:{" "}
                                                                        {
                                                                            submission.feedback
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <span className="text-purple-600 text-sm">
                                                                View →
                                                            </span>
                                                        </div>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 text-center">
                                        No past due assignments.
                                    </p>
                                )}
                            </div>

                            {/* Completed Assignments */}
                            <div>
                                <h3 className="text-lg font-bold text-blue-600 mb-2">
                                    Completed
                                </h3>
                                {completedAssignments.length > 0 ? (
                                    <ul className="space-y-4">
                                        {completedAssignments.map(
                                            (assignment) => {
                                                const submission =
                                                    submissions.find(
                                                        (sub) =>
                                                            sub.assignment_id ===
                                                            assignment.id
                                                    );

                                                return (
                                                    <li
                                                        key={assignment.id}
                                                        className="border rounded-lg p-4 bg-blue-50 shadow cursor-pointer"
                                                        onClick={() =>
                                                            setSelectedAssignment(
                                                                assignment
                                                            )
                                                        }
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <div>
                                                                <h3 className="font-semibold">
                                                                    {
                                                                        assignment.title
                                                                    }
                                                                </h3>
                                                                <p className="text-sm text-gray-500">
                                                                    Due:{" "}
                                                                    {new Date(
                                                                        assignment.due_date
                                                                    ).toLocaleDateString()}
                                                                </p>
                                                                {submission?.grade && (
                                                                    <p className="text-sm text-green-600 mt-1">
                                                                        Grade:{" "}
                                                                        {
                                                                            submission.grade
                                                                        }
                                                                    </p>
                                                                )}
                                                                {submission?.feedback && (
                                                                    <p className="text-sm text-blue-600 mt-1">
                                                                        Feedback:{" "}
                                                                        {
                                                                            submission.feedback
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                            <span className="text-purple-600 text-sm">
                                                                View →
                                                            </span>
                                                        </div>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 text-center">
                                        No completed assignments.
                                    </p>
                                )}
                            </div>
                            {assignments.length > 0 ? (
                                <ul className="space-y-4">
                                    {assignments.map((assignment) => {
                                        const submission = submissions.find(
                                            (sub) =>
                                                sub.assignment_id ===
                                                assignment.id
                                        );

                                        return (
                                            <li
                                                key={assignment.id}
                                                className="border rounded-lg p-4 bg-white shadow cursor-pointer"
                                                onClick={() =>
                                                    setSelectedAssignment(
                                                        assignment
                                                    )
                                                }
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className="font-semibold">
                                                            {assignment.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            Due:{" "}
                                                            {new Date(
                                                                assignment.due_date
                                                            ).toLocaleDateString()}
                                                        </p>
                                                        {submission?.grade && (
                                                            <p className="text-sm text-green-600 mt-1">
                                                                Grade:{" "}
                                                                {
                                                                    submission.grade
                                                                }
                                                            </p>
                                                        )}
                                                        {submission?.feedback && (
                                                            <p className="text-sm text-blue-600 mt-1">
                                                                Feedback:{" "}
                                                                {
                                                                    submission.feedback
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span className="text-purple-600 text-sm">
                                                        View & Submit →
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-center">
                                    No assignments posted yet.
                                </p>
                            )}

                            {/* Modal or Section for Viewing Assignment and Uploading Submission */}
                            {selectedAssignment && (
                                <div className="mt-6 p-6 border rounded-lg bg-gray-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-bold">
                                            {selectedAssignment.title}
                                        </h3>
                                        <button
                                            onClick={() =>
                                                setSelectedAssignment(null)
                                            }
                                            className="text-sm text-red-500"
                                        >
                                            Close
                                        </button>
                                    </div>
                                    <p className="mb-2 text-gray-700">
                                        {selectedAssignment.description}
                                    </p>
                                    <p className="mb-4 text-sm text-gray-500">
                                        Due:{" "}
                                        {new Date(
                                            selectedAssignment.due_date
                                        ).toLocaleString()}
                                    </p>

                                    {selectedAssignment.attachment && (
                                        <div className="mb-4">
                                            <a
                                                href={`/assignments/${selectedAssignment.attachment}`}
                                                target="_blank"
                                                className="text-purple-600 text-sm underline"
                                            >
                                                Download Attachment
                                            </a>
                                        </div>
                                    )}

                                    {(() => {
                                        const submission = submissions.find(
                                            (sub) =>
                                                sub.assignment_id ===
                                                selectedAssignment.id
                                        );

                                        const isPastDue =
                                            new Date(
                                                selectedAssignment.due_date
                                            ) < new Date();

                                        if (
                                            submission &&
                                            submission.status === "turned_in"
                                        ) {
                                            return (
                                                <p className="text-green-600 font-semibold">
                                                    You have already submitted
                                                    this assignment.
                                                </p>
                                            );
                                        } else if (isPastDue) {
                                            return (
                                                <p className="text-red-600 font-semibold">
                                                    Sorry, this assignment is
                                                    past due and can no longer
                                                    be submitted.
                                                </p>
                                            );
                                        } else if (
                                            submission &&
                                            submission.status === "completed"
                                        ) {
                                            return (
                                                <p className="text-green-600">
                                                    Assignment Completed
                                                </p>
                                            );
                                        } else {
                                            return (
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        if (!file) return;

                                                        const formData =
                                                            new FormData();
                                                        formData.append(
                                                            "file",
                                                            file
                                                        );
                                                        formData.append(
                                                            "assignment_id",
                                                            selectedAssignment.id
                                                        );

                                                        axios
                                                            .post(
                                                                route(
                                                                    "assignment.submit"
                                                                ),
                                                                formData,
                                                                {
                                                                    headers: {
                                                                        "Content-Type":
                                                                            "multipart/form-data",
                                                                    },
                                                                }
                                                            )
                                                            .then(() => {
                                                                alert(
                                                                    "Submission uploaded successfully!"
                                                                );
                                                                setFile(null);
                                                                setSelectedAssignment(
                                                                    null
                                                                );
                                                            })
                                                            .catch(() => {
                                                                alert(
                                                                    "Submission failed. Try again."
                                                                );
                                                            });
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <input
                                                        type="file"
                                                        onChange={(e) =>
                                                            setFile(
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                        required
                                                        className="block w-full text-sm"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                                                    >
                                                        Submit Assignment
                                                    </button>
                                                </form>
                                            );
                                        }
                                    })()}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
