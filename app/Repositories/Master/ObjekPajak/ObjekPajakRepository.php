<?php

namespace App\Repositories\Master\ObjekPajak;

use App\Http\Resources\Common\SelectOptionResource;
use App\Models\ObjekPajak;

class ObjekPajakRepository
{
    public function __construct(protected ObjekPajak $model) {}
    public function list($jenisObjek)
    {
        return SelectOptionResource::collection($this->model::select('id', 't_nama_objek AS name')->where('t_id_jenis_objek', $jenisObjek)->where('t_id_rekening_objek', 83)->get());
    }
}
