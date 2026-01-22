<?php

namespace App\Repositories\Master\Pengguna;

use App\Http\Resources\Pengguna\PenggunaResource;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PenggunaRepository
{
    public function __construct(protected User $model) {}
    private function applySearchFilter($request)
    {
        return fn($q) => $q->where(function ($query) use ($request) {
            $query->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%")
                ->orWhereHas('roles', fn($q) => $q->where('name', 'like', "%{$request->search}%"));
        });
    }
    public function data($request)
    {
        $query = $this->model::with('roles')->select('id', 'nid', 'name', 'email', 'telp')
            ->when($request->search, $this->applySearchFilter($request));
        $result = PenggunaResource::collection($query->latest()->paginate($request->perPage ?? 25))->response()->getData(true);
        return $result['meta'] + ['data' => $result['data']];
    }
    public function store($request)
    {
        try {
            DB::beginTransaction();
            $user = $this->model->create([
                'nid' => $request->nid,
                'name' => $request->nama,
                'email' => $request->email,
                'telp' => $request->telp,
                'password' => Hash::make($request->password),
            ]);
            $user->assignRole($request->role);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function update($user, $request)
    {
        try {
            DB::beginTransaction();
            $user->update([
                'nid' => $request->nid,
                'name' => $request->nama,
                'email' => $request->email,
                'telp' => $request->telp,
            ]);
            $user->syncRoles($request->role);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function delete($user)
    {
        return $user->delete();
    }
}
