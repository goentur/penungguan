<?php

namespace App\Repositories\Transaksi;

use App\Models\Penungguan;
use Illuminate\Support\Facades\DB;

class PenungguanRepository
{
    public function __construct(protected Penungguan $model) {}

    public function store($request)
    {
        try {
            DB::beginTransaction();
            $this->model->create([
                'objek_id' => $request->objek,
                'nominal' => $request->nominal,
                'kendaraan' => $request->kendaraan,
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update($id, $request)
    {
        try {
            DB::beginTransaction();
            $penungguan = $this->model->findOrFail($id);
            $penungguan->update([
                'nominal' => $request->nominal,
                'kendaraan' => $request->kendaraan,
            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function delete($id)
    {
        try {
            DB::beginTransaction();
            $penungguan = $this->model->findOrFail($id);
            $penungguan->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
