<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoCallParticipant extends Model
{
    protected $fillable = [
        'video_call_id',
        'user_id'
    ];
}
