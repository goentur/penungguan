<?php

namespace App\Repositories\Transaksi;

use App\Models\Penungguan;
use App\Support\Facades\Helpers;
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
    public function data($id)
    {
        try {
            DB::beginTransaction();
            $result = $this->model::where(['objek_id' => $id])->whereDate('updated_at', today())
                ->selectRaw('
                    SUM(nominal) AS total,
                    COUNT(*) AS jumlah,
                    COUNT(*) FILTER (WHERE kendaraan = ?) AS motor,
                    COUNT(*) FILTER (WHERE kendaraan = ?) AS mobil,
                    COUNT(*) FILTER (WHERE kendaraan = ?) AS online,
                    COUNT(*) FILTER (WHERE kendaraan = ?) AS lainnya
                ', ['motor', 'mobil', 'online', 'lainnya'])
                ->first();
            $total = $result?->total ?? 0;
            $jumlah = $result?->jumlah ?? 0;
            return [
                'total' => Helpers::ribuan($total),
                'jumlah' => Helpers::ribuan($jumlah),
                'kendaraan' => [
                    'motor' => (int) ($result?->motor ?? 0),
                    'mobil' => (int) ($result?->mobil ?? 0),
                    'online' => (int) ($result?->online ?? 0),
                    'lainnya' => (int) ($result?->lainnya ?? 0),
                ]
            ];

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
