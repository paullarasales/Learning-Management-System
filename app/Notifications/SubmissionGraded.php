<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class SubmissionGraded extends Notification
{
    use Queueable;

    protected $submission;

    public function __construct($submission)
    {
        $this->submission = $submission;
    }

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'Your submission has been graded.',
            'grade' => $this->submission->grade,
            'feedback' => $this->submission->feedback,
            'submission_id' => $this->submission->id,
        ];
    }
}
