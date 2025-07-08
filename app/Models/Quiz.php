<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = [
        'class_id',
        'title',
        'description',
    ];

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
