<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Thread;
use App\Models\Material;
use App\Models\Reply;
use App\Models\Task;
use App\Models\Assignment;
use App\Models\ClassModel;
use Inertia\Inertia;

class InstructorController extends Controller
{
    public function dashboard()
    {
        $instructor = Auth::user();

        if ($instructor->role !==  'instructor') {
            abort(403, 'Unauthorized');
        }

        $tasks = Task::where('user_id', $instructor->id)->take(5)->get();
        $myClasses = ClassModel::where('instructor_id', $instructor->id)->take(5)->get();
        $myStudent = ClassModel::where('instructor_id', $instructor->id)
            ->with('students')
            ->get()
            ->pluck('students')
            ->flatten()
            ->unique('id')
            ->values();

        // dd($myStudent);
        // dd($myClasses);

        return Inertia::render('Instructor/Dashboard', [
                'tasks' => $tasks,
                'myClasses' => $myClasses,
                'myStudent' => $myStudent
            ]
        );
    }

    public function classList()
    {
        $instructorId = auth()->id();

        $classList = ClassModel::where('instructor_id', $instructorId)->get();

        $students = User::where('role', 'student')->get();

        return Inertia::render('Instructor/ClassList', [
            'classList' => $classList,
        ]);
    }

    public function create()
    {
        return Inertia::render('Instructor/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $data['instructor_id'] = auth()->id();

        ClassModel::create($data);

        return response()->json(['message' => 'Classroom created successfully.']);
    }

    public function show($id)
    {
        $classroom = ClassModel::with('students')->where('instructor_id', auth()->id())->findOrFail($id);
        $students = User::where('role', 'student')->get();

        $threads = Thread::with(['user', 'replies.user'])
                        ->where('class_id', $id)
                        ->latest()
                        ->get();

        $materials = Material::where('class_id', $id)->latest()->get();

        $assignments = Assignment::with([
            'submissions.student'
        ])->where('class_id', $id)
          ->latest()
          ->get();

        return Inertia::render('Instructor/Classroom', [
            'classroom' => $classroom,
            'students' => $students,
            'initialThreads' => $threads,
            'materials' => $materials,
            'assignments' => $assignments,
        ]);
    }


    public function addStudent(Request $request, $id)
    {
        $request->validate([
            'student_id' => 'required|exists:users,id',
        ]);

        $class = ClassModel::where('instructor_id', auth()->id())->findOrFail($id);

        $class->students()->syncWithoutDetaching($request->student_id); // prevents duplicate entries

        return back();
    }

    public function storeThread(Request $request, $id)
    {
        $request->validate(['message' => 'required|string']);

        Thread::create([
            'class_id' => $id,
            'user_id' => auth()->id(),
            'message' => $request->message,
        ]);

        return back();
    }

    public function storeReply(Request $request, Thread $thread)
    {
        $request->validate(['message' => 'required|string']);

        Reply::create([
            'thread_id' => $thread->id,
            'user_id' => auth()->id(),
            'message' => $request->message,
        ]);

        return back();
    }

    public function storeAss(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,docx,txt|max:10240', // You can adjust the allowed file types if necessary
            'classroom_id' => 'required|exists:classes,id', // Ensuring the class ID exists
            'due_date' => 'required|date', // Validate due date
        ]);

        // Check if a file is uploaded
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $uploadPath = public_path('assignments'); // Folder where you want to store the files

            // Create the directory if it doesn't exist
            if (!File::exists($uploadPath)) {
                File::makeDirectory($uploadPath, 0777, true);
            }

            // Move the file to the designated folder
            $file->move($uploadPath, $filename);
            $filePath = $filename; // Save the filename (not full path) to the database

            // Create a new assignment record
            Assignment::create([
                'class_id' => $request->input('classroom_id'),
                'title' => $request->input('title'),
                'description' => $request->input('description', ''), // Optional description
                'due_date' => $request->input('due_date'),
                'attachment' => $filePath, // Save just the filename to database
            ]);

            return back()->with('success', 'Assignment uploaded successfully');
        } else {
            return back()->with('error', 'Assignment not uploaded successfully');
        }
    }

}
