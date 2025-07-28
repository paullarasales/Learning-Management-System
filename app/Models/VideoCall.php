<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoCall extends Model
{
    protected $fillable = [
        'host_id',
        'room_id',
        'host_peer_id',
        'status',
        'classroom_id'
    ];

    public function host()
    {
        return $this->belongsTo(User::class, 'host_id');
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'video_call_participants');
    }

    public function classroom()
    {
        return $this->belongsTo(ClassModel::class, 'classroom_id');
    }
}
