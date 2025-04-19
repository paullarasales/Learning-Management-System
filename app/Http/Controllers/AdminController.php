<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\ClassModel;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard');
    }

    public function classroomView()
    {
        return Inertia::render('Admin/Classroom');
    }

    public function classroom()
    {
        $classes = ClassModel::withCount('students')->get();
        return response()->json($classes);
    }

    public function index()
    {
        $instructors = User::where('role', 'instructor')->get();

        return Inertia::render('Admin/Instructor', [
            'instructors' => $instructors,
        ]);
    }

    public function manageInstructor()
    {
        return Inertia::render('Admin/ManageAccount');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'firstname' => 'nullable|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email',
            'password' => 'nullable|string|min:8|confirmed',
            'specialization' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $path = $file->move(public_path('profiles'), $filename);
            $data['profile_picture'] = $filename;
        }

        $data['role'] = 'instructor';
        $data['password'] = Hash::make($data['password']);
        $data['email_verified_at'] = now();

        User::create($data);

        return response()->json(['message' => 'Instructor account created successfully']);
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/EditAccount', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'firstname' => 'nullable|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'nullable|string|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'specialization' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'profile_picture' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('profiles'), $filename);
            $data['profile_picture'] = $filename;
        } else {
            $data['profile_picture'] = $user->profile_picture;
        }

        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return redirect()->back()->with('message', 'Instructor account updated successfully.');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.instructor');
    }

    public function profile()
    {
        $user = Auth::user();

        return Inertia::render('Admin/Profile', [
            'user' => $user,
        ]);
    }

    public function updateProfile(Request $request)
    {
        // dd($request->hasFile('profile_picture'));
        $user = Auth::user();

        $validated = $request->validate([
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'password' => 'nullable|string|min:10|confirmed',
            'profile_picture' => 'nullable|image|max:2048',
        ]);

        if ($validated['password']) {
            $user->password = Hash::make($validated['password']);
        }

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('profiles'), $filename);
            $user->profile_picture = 'profiles/' . $filename;
        }

        $user->firstname = $validated['firstname'];
        $user->middlename = $validated['middlename'];
        $user->lastname = $validated['lastname'];
        $user->contact_number = $validated['contact_number'];

        $user->save();

        return redirect()->route('admin.profile')->with('succes', 'Profile updated successfully.');
    }
}
