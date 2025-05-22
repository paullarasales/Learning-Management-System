<?php

namespace App\Notifications;

use App\Models\Material;
use App\Models\ClassModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewMaterialNotification extends Notification
{
    use Queueable;

    public $material;

    /**
     * Create a new notification instance.
     */
    public function __construct(Material $material)
    {
        $this->material = $material;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $class = ClassModel::find($this->material->class_id);
        return [
            'material_id' => $this->material->id,
            'title' => $this->material->title,
            'class_name' => $class ? $class->name : '',
            'uploaded_at' => $this->material->created_at,
        ];
    }
}
