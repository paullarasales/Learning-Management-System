<?php

namespace App\Notifications;

use App\Models\Assignment;
use App\Models\ClassModel;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewAssignmentNotification extends Notification
{
    use Queueable;

    public $assignment;

    public function __construct(Assignment $assignment)
    {
        $this->assignment = $assignment;
    }

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $class = ClassModel::find($this->assignment->class_id);
        return [
            'assignment_id' => $this->assignment->id,
            'title' => $this->assignment->title,
            'class_name' => $class ? $class->name : '',
            'due_date' => $this->assignment->due_date,
            'created_at' => $this->assignment->created_at,
        ];
    }
}
