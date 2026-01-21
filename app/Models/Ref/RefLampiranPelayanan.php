<?php

namespace App\Models\Ref;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RefLampiranPelayanan extends Pivot
{
    protected $fillable = ['no_urut'];
}
