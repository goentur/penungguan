<?php

namespace App\Http\Requests\Transaksi\Penungguan;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'objek' => 'required|numeric',
            'nominal' => 'required|numeric',
            'kendaraan' => 'required|in_array[1,2,3]',
        ];
    }
}
