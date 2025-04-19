<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Thread;
use App\Models\Task;
use App\Models\Material;
use App\Models\Assignment;
use App\Models\ClassModel;
use App\Models\Submission;
use Inertia\Inertia;
use Carbon\Carbon;

class StudentController extends Controller
{

    public function dashboard()
    {
        $student = Auth::user();

        if ($student->role !== 'student') {
            abort(403, 'Unauthorized');
        }

        $classes = $student->enrolledClasses()->with('instructor')->take(4)->get();

        $classIds = $classes->pluck('id'); // student enrolled class IDs

        $assignments = Assignment::whereIn('class_id', $classIds)
            ->where('due_date', '>=', now())
            ->latest()
            ->get();

        $tasks = Task::where('user_id', $student->id)->get();

        return Inertia::render('Dashboard', [
                'student' => $student->only([
                    'firstname', 'middlename', 'lastname', 'email',
                    'contact_number', 'specialization', 'bio', 'profile_picture'
                ]),
                'classes' => $classes,
                'assignments' => $assignments,
                'tasks' => $tasks
            ]);

    }


    public function classroom()
    {
        $student = Auth::user();

        if ($student->role !== 'student') {
            abort (403, 'Unauthorized');
        }

        $classes = $student->enrolledClasses()->with('instructor')->get();

        return Inertia::render('Class', [
            'classes' => $classes,
        ]);
    }

    public function show($id)
    {
        // Get the logged-in student
        $student = auth()->user();

        $classroom = ClassModel::with('students')
        ->whereHas('students', function ($query) use ($student) {
            $query->where('student_id', $student->id); // Correct column name here
        })
        ->findOrFail($id);


        // Fetch threads for this class
        $threads = Thread::with(['user', 'replies.user'])
                        ->where('class_id', $id)
                        ->latest()
                        ->get();

        // Fetch materials for this class
        $materials = Material::where('class_id', $id)
                            ->latest()
                            ->get();


        $assignments = Assignment::where('class_id', $id)->latest()->get();


        $submissions = Submission::with('assignment')
                                    ->where('student_id', auth()->id())
                                    ->get();

        // Return data to the frontend
        return Inertia::render('Classroom', [
            'classroom' => $classroom,
            'initialThreads' => $threads,
            'materials' => $materials, // Pass the materials to the frontend
            'assignments' => $assignments,
            'submissions' => $submissions,
        ]);
    }

    public function submit(Request $request)
    {
        try {
            $request->validate([
                'assignment_id' => 'required|exists:assignments,id',
                'file' => 'required|file|mimes:pdf,docx,zip,rar,jpg,png',
            ]);

            if (!$request->hasFile('file')) {
                return response()->json(['message' => 'File is required.'], 400);
            }

            $student = auth()->user();
            if (!$student) {
                return response()->json(['message' => 'User not authenticated.'], 401);
            }

            $assignment = Assignment::findOrFail($request->assignment_id);

            // Check if the due date has passed
            if (now()->greaterThan($assignment->due_date)) {
                return response()->json(['message' => 'Deadline has passed.'], 403);
            }

            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('submissions');

            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }

            $file->move($destinationPath, $fileName);
            $filePath = $fileName;


                Submission::create([
                    'assignment_id' => $assignment->id,
                    'student_id' => $student->id,
                    'assignment_folder' => $filePath,
                    'status' => 'turned_in',
                ]);

            return response()->json(['message' => 'Assignment submitted successfully.']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
