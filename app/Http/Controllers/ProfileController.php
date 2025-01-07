<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user()->load('school');

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'school' => $user->school ? [
                'name' => $user->school->name,
                'CIF' => $user->school->CIF,
                'address' => $user->school->address,
                'city' => $user->school->city,
            ] : null,
        ]);
    }



    public function colegio(Request $request)
    {
        $user = $request->user()->load('school'); // Carga la relación 'school'

        if (!$user->school) {
            return response()->json([
                'message' => 'No school assigned to this user.',
            ], 404);
        }

        return response()->json([
            'name' => $user->school->name ?? 'No asignado',
            'CIF' => $user->school->CIF ?? 'No asignado',
            'address' => $user->school->address ?? 'No asignado',
            'city' => $user->school->city ?? 'No asignado',
        ]);
    }


    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
