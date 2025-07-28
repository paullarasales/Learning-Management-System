<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VideoCall;
use App\Models\ClassModel;
use App\Models\VideoCallParticipant;
use Inertia\Inertia;
use Illuminate\Support\Str;

class VideoCallController extends Controller
{
    public function show(VideoCall $videoCall)
    {
        $videoCall->load('classroom');
        return Inertia::render('VideoCall/Show', [
            'videoCall' => $videoCall
        ]);
    }

    public function start(ClassModel $classroom)
    {
        $activeCall = VideoCall::where('classroom_id', $classroom->id)
            ->where('status', 'started')
            ->first();

        if ($activeCall) {
            return redirect()->route('video.call.show', $activeCall->id);
        }

        $videoCall = VideoCall::create([
            'classroom_id' => $classroom->id,
            'status' => 'started',
            'host_id' => auth()->id(),
            'room_id' => Str::uuid()->toString(),
        ]);

        return redirect()->route('video.call.show', $videoCall->id);
    }

    public function join(Request $request, $id)
    {
        $call = VideoCall::findOrFail($id);

        VideoCallParticipant::firstOrCreate([
            'video_call_id' => $call->id,
            'user_id' => auth()->id(),
        ]);

        return response()->json($call);
    }


    public function participants($id)
    {
        $participants = VideoCallParticipant::with('user')
            ->where('video_call_id', $id)
            ->get();

        return response()->json([
            'participants' => $participants
        ]);
    }

    public function end($id)
    {
        $call = VideoCall::findOrFail($id);

        if ($call->host_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized.'], 403);
        }

        $call->update(['status' => 'ended']);

        return response()->json(['message' => 'Call ended!']);
    }

    public function leave($id)
    {
        $call = VideoCall::findOrFail($id);

        $participant = VideoCallParticipant::where('video_call_id', $call->id)
            ->where('user_id', auth()->id())
            ->first();

        if ($participant) {
            $participant->delete();
        }

        return response()->json(['message' => 'Left the call.']);
    }

    public function check($classroomId)
    {
        $videoCall = VideoCall::where('classroom_id', $classroomId)
            // ->where('status', 'started')
            ->latest()
            ->first();


        return response()->json([
            'videoCall' => $videoCall ?? null,
        ]);
    }

    public function registerPeer(Request $request, $id)
    {
        $call = VideoCall::findOrFail($id);

        $participant = VideoCallParticipant::firstOrCreate([
            'video_call_id' => $call->id,
            'user_id' => auth()->id(),
        ]);

        $participant->peer_id = $request->peer_id;
        $participant->save();

        return response()->json(['status' => 'ok']);
    }
}
