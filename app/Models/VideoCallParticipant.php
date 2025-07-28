<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoCallParticipant extends Model
{
    protected $fillable = [
        'video_call_id',
        'user_id',
        'peer_id'
    ];

    public function videocall()
    {
        return $this->belongsTo(VideoCall::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
