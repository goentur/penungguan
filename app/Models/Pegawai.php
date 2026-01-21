<?php

namespace App\Models;

use App\Traits\HasUsersTamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pegawai extends Model
{
    use SoftDeletes, HasUsersTamps;
    protected $fillable = [
        'nama',
        'nip',
        'status_tte',
    ];
    public function user()
    {
        return $this->morphOne(User::class, 'accountable');
    }
}
