<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Registered;
use App\Models\User;
use Illuminate\Http\Request;

class GoogleController extends Controller
{
    public function redirectToGoogle(Request $request)
    {
        return Socialite::driver('google')->redirect();
    }

    public function redirectToGoogleInstructor()
    {
        session(['registering_as' => 'instructor']);
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            $user = User::where('email', $googleUser->email)->first();

            if (!$user) {
                $role = session('registering_as', 'student');

                $user = User::create([
                    'firstname' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'role' => $role,
                    'password' => bcrypt('default'),
                    'email_verified_at' => now(),
                ]);
            } else {
                if (!$user->google_id) {
                    $user->google_id = $googleUser->id;
                    $user->save();
                }
            }

            Auth::login($user);

            return match($user->role) {
                'admin' => redirect()->intended('/admin/dashboard'),
                'instructor' => redirect()->intended('/instructor/dashboard'),
                'student' => redirect()->intended('/student/dashboard'),
            };

        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['google' => 'Google authentication failed']);
        }
    }

    // public function handleGoogleCallback(Request $request)
    // {
    //     try {
    //         $googleUser = Socialite::driver('google')->stateless()->user();

    //         $user = User::where('email', $googleUser->email)->first();

    //         if (!$user) {
    //             $user = User::create([
    //                 'firstname' => $googleUser->name,
    //                 'email' => $googleUser->email,
    //                 'google_id' => $googleUser->id,
    //                 'password' => bcrypt('defaultpassword'),
    //             ]);

    //             if ($googleUser->user['verified_email'] ?? false) {
    //                 $user->email_verified_at = now();
    //                 $user->save();
    //             } else {
    //                 event(new Register($user));
    //             }

    //             if (!$user->hasVerifiedEmail()) {
    //                 return redirect()->route('verification.notice')->with('message', 'Please verify your email.');
    //             }
    //         }

    //         Auth::login($user);

    //         if ($user->role === 'admin') {
    //             return redirect()->intended('/admin/dashboard');

    //         } else if ($user->role === 'instructor') {
    //             return redirect()->intended('/instructor/dashboard');
    //         }

    //         return redirect()->intended('/student/dashboard');
    //     } catch (\Exception $e) {
    //         return redirect('/login')->withErrors(['error' => 'Failed to authenticate']);
    //     }
    // }
}
