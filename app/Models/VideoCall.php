<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoCall extends Model
{
    protected $fillable = [
        'host_id',
        'room_id',
        'host_peer_id',
        'status'
    ];
}
