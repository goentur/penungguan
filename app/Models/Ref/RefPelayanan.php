<?php

namespace App\Models\Ref;

use App\Traits\HasUserStamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefPelayanan extends Model
{
    use SoftDeletes, HasUserStamps;
    protected $fillable = [
        'nama',
        'keterangan',
        'url',
        'status_pelayanan',
        'status_tte',
    ];

    public function lampiran()
    {
        return $this->belongsToMany(RefLampiran::class, 'ref_lampiran_pelayanans')
            ->withPivot('no_urut')
            ->orderBy('no_urut')
            ->using(RefLampiranPelayanan::class);
    }
}
