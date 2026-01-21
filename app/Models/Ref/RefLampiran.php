<?php

namespace App\Models\Ref;

use App\Traits\HasUserStamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefLampiran extends Model
{
    use SoftDeletes, HasUserStamps;
    protected $fillable = [
        'nama',
        'wajib',
    ];
}
