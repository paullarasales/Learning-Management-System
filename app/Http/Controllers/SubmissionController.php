<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submission;

class SubmissionController extends Controller
{
    public function addGrade(Request $request, Submission $submission)
{
    $validated = $request->validate([
        'grade' => 'nullable|string|max:10',
        'feedback' => 'nullable|string|max:1000',
    ]);

    // Update grade, feedback, and status
    $submission->update([
        ...$validated,
        'status' => 'completed',
    ]);

    return back()->with('success', 'Submission graded.');
}

}
