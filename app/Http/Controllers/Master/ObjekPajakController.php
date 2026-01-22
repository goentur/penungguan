<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Repositories\Master\ObjekPajak\ObjekPajakRepository;

class ObjekPajakController extends Controller
{
    public function __construct(protected ObjekPajakRepository $repository)
    {
        $this->repository = $repository;
    }
    public function list()
    {
        return response()->json($this->repository->list(2), 200);
    }
}
