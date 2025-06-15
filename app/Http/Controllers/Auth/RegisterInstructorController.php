<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validaton\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisterInstructorController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/InstructorRegister');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'firstname' => 'required|string|max:255',
            'middlename' => 'nullable|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'specialization' => 'nullable|string|max:255',
        ]);

        $data['role'] = 'instructor';

        $user = User::create([
            'firstname' => $data['firstname'],
            'middlename' => $data['middlename'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'password' => Hash::make($data->password),
            'role' => $data['role']
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('instructor.dashboard', absolute: false));
    }
}
