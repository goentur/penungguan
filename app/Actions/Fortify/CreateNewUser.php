<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'nid' => ['required', 'string', 'regex:/^(\d{16}|[A-Z]\d{6,8})$/', Rule::unique(User::class)],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'password' => $this->passwordRules(),
            'telp' => ['required', 'string', 'regex:/^(?:\+62|62|0)8[1-9]\d{7,10}$/', Rule::unique(User::class)]
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'nid' => $input['nid'],
            'password' => $input['password'],
            'email' => $input['email'],
            'telp' => $input['telp'],
        ]);
        $user->assignRole('WAJIB-PAJAK');
        return $user;
    }
}
