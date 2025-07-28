import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import axios from "axios";
import { usePage } from "@inertiajs/react";

export default function VideoCall({ videoCall }) {
    const { auth } = usePage().props;
    const myVideoRef = useRef(null);
    const peerInstance = useRef(null);
    const streamRef = useRef(null);
    const calledPeers = useRef(new Set());

    const [peerId, setPeerId] = useState(null);
    const [sharing, setSharing] = useState(false);
    const [participants, setParticipants] = useState([]);

    const currentUser = auth.user;

    // STEP 1: Initialize Peer and set up receiving streams
    useEffect(() => {
        const myPeer = new Peer();

        myPeer.on("open", (id) => {
            setPeerId(id);
            console.log("My Peer ID:", id);
        });

        myPeer.on("call", (call) => {
            call.answer();

            call.on("stream", (remoteStream) => {
                console.log("Received remote stream:", remoteStream);

                if (myVideoRef.current) {
                    myVideoRef.current.srcObject = remoteStream;
                }
            });
        });

        peerInstance.current = myPeer;

        return () => {
            myPeer.destroy();
        };
    }, []);

    // STEP 2: Join the call
    useEffect(() => {
        axios
            .post(`/video-call/${videoCall.id}/join`)
            .then(() => console.log("Joined video call."))
            .catch((err) => console.error("Failed to join video call:", err));
    }, []);

    // STEP 3: Register peer ID after it's available
    useEffect(() => {
        if (!peerId || !videoCall) return;

        axios
            .post(`/video-call/${videoCall.id}/register-peer`, {
                peer_id: peerId,
            })
            .then(() => console.log("Registered peer ID"))
            .catch((err) => console.error("Failed to register peer ID:", err));
    }, [peerId]);

    // STEP 4: Start screen sharing and call participants if host
    const startSharing = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });

            if (myVideoRef.current) {
                myVideoRef.current.srcObject = stream;
            }

            streamRef.current = stream;
            setSharing(true);

            stream.getTracks().forEach((track) => {
                track.onended = () => {
                    stopSharing();
                };
            });

            // Host sends the stream to all participants
            if (auth.user.id === videoCall.host_id) {
                try {
                    const res = await axios.get(
                        `/video-call/${videoCall.id}/participants`
                    );
                    res.data.participants.forEach((p) => {
                        if (p.user.id !== auth.user.id && p.peer_id) {
                            const call = peerInstance.current.call(
                                p.peer_id,
                                stream
                            );
                            console.log(
                                "Calling:",
                                p.user.firstname,
                                p.peer_id
                            );

                            call.on("error", (err) => {
                                console.error(
                                    "Call error with",
                                    p.peer_id,
                                    err
                                );
                            });
                        }
                    });
                } catch (err) {
                    console.error("Failed to call participants", err);
                }
            }
        } catch (err) {
            console.error("Screen share error:", err);
        }
    };

    const stopSharing = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        if (myVideoRef.current) {
            myVideoRef.current.srcObject = null;
        }

        setSharing(false);
    };

    const handleEndCall = async () => {
        if (!videoCall || !videoCall.id) return;

        try {
            await axios.post(`/video-call/${videoCall.id}/end`);
            window.location.href = `/instructor/classroom/${videoCall.classroom.id}`;
        } catch (error) {
            console.error("Failed to end call:", error);
        }
    };

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const res = await axios.get(
                    `/video-call/${videoCall.id}/participants`
                );
                setParticipants(res.data.participants);
            } catch (err) {
                console.error("Failed to fetch participants", err);
            }
        };

        fetchParticipants();
        const interval = setInterval(fetchParticipants, 1000);
        return () => clearInterval(interval);
    }, []);

    // student auto redirect back
    useEffect(() => {
        if (auth.user.id === videoCall.host_id) return;

        const checkCallStatus = async () => {
            try {
                const res = await axios.get(
                    `/video-call/check/${videoCall.classroom.id}`
                );
                const activeCall = res.data.videoCall;

                console.log("Test: ", activeCall.status);

                if (!activeCall || activeCall.status === "ended") {
                    alert("The call has ended.");
                    window.location.href = `/classroom/${videoCall.classroom.id}`;
                }
            } catch (error) {
                console.error("Failed to check the video call status", error);
            }
        };

        const interval = setInterval(checkCallStatus, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (
            auth.user.id !== videoCall.host_id || // only host should do this
            !sharing ||
            !streamRef.current ||
            !participants.length
        )
            return;

        participants.forEach((p) => {
            if (
                p.user.id !== auth.user.id &&
                p.peer_id &&
                !calledPeers.current.has(p.peer_id) // only call if not called before
            ) {
                const call = peerInstance.current.call(
                    p.peer_id,
                    streamRef.current
                );
                console.log("Calling NEW peer:", p.user.firstname, p.peer_id);

                call.on("error", (err) => {
                    console.error("Call error with", p.peer_id, err);
                });

                // mark as called
                calledPeers.current.add(p.peer_id);
            }
        });
    }, [participants]);

    return (
        <div className="h-screen flex flex-col bg-[#f3f4f6]">
            {/* Top Header */}
            <header className="bg-[#252c3e] text-white px-6 py-4 flex justify-between items-center shadow">
                <div className="text-lg font-semibold">
                    Classroom: {videoCall?.classroom?.name || "Loading..."}
                </div>
                <div className="text-sm">Peer ID: {peerId || "Loading..."}</div>
                {auth.user.id === videoCall.host_id && (
                    <button
                        onClick={handleEndCall}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium"
                    >
                        End Call
                    </button>
                )}
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Participants */}
                <aside className="w-64 bg-white border-r p-4 overflow-y-auto">
                    <h2 className="text-lg font-semibold mb-4 text-[#374151]">
                        Participants
                    </h2>
                    <ul className="space-y-2">
                        {participants
                            .filter((p) => p.user.id !== videoCall.host_id)
                            .map((p) => (
                                <li
                                    key={p.id}
                                    className="text-gray-700 text-sm"
                                >
                                    {p.user.firstname} {p.user.lastname}
                                    {p.user.id === currentUser.id && " (You)"}
                                </li>
                            ))}
                    </ul>
                    {auth.user.id !== videoCall.host_id && (
                        <button
                            onClick={async () => {
                                try {
                                    await axios.post(
                                        `/video-call/${videoCall.id}/leave`
                                    );
                                    window.location.href = `/classroom/${videoCall.classroom.id}`;
                                } catch (error) {
                                    console.error(
                                        "Failed to leave call.",
                                        error
                                    );
                                }
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full"
                        >
                            Leave Call
                        </button>
                    )}
                </aside>

                {/* Main Video Section */}
                <main className="flex-1 p-6 flex flex-col justify-center items-center relative">
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg w-full max-w-5xl aspect-video flex items-center justify-center">
                        <video
                            ref={myVideoRef}
                            autoPlay
                            muted
                            className="w-full h-full object-contain bg-black"
                        />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                        {auth.user.id === videoCall.host_id
                            ? "You are sharing your screen"
                            : "Instructor is sharing the screen"}
                    </p>

                    {/* Action Buttons */}
                    <div className="absolute bottom-6 flex gap-4">
                        {auth.user.id === videoCall.host_id && (
                            <>
                                {!sharing ? (
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium shadow"
                                        onClick={startSharing}
                                    >
                                        Start Screen Share
                                    </button>
                                ) : (
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full font-medium shadow"
                                        onClick={stopSharing}
                                    >
                                        Stop Sharing
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
