<?php

namespace App\Models;

use App\Traits\HasUserStamps;
use Illuminate\Database\Eloquent\Model;

class Penungguan extends Model
{
    use HasUserStamps;
    protected $fillable = [
        'objek_id',
        'nominal',
        'kendaraan',
    ];
}
