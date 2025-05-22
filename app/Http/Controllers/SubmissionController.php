<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\SubmissionGraded;
use App\Models\Submission;

class SubmissionController extends Controller
{
    public function addGrade(Request $request, Submission $submission)
    {
        // Ensure the student relationship is loaded
        $submission->load('student');

        $validated = $request->validate([
            'grade' => 'nullable|string|max:10',
            'feedback' => 'nullable|string|max:1000',
        ]);

        // Update grade, feedback, and status
        $submission->update([
            ...$validated,
            'status' => 'completed',
        ]);

        // Notify the student if exists
        if ($submission->student) {
            $submission->student->notify(new SubmissionGraded($submission));
        }

        return back()->with('success', 'Submission graded.');
    }
}
