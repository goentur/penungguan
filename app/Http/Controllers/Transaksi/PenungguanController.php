<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use App\Http\Requests\Common\DataRequest;
use App\Http\Requests\Transaksi\Penungguan\StoreRequest;
use App\Http\Requests\Transaksi\Penungguan\UpdateRequest;
use App\Models\Penungguan;
use App\Repositories\Transaksi\PenungguanRepository;
use App\Support\Facades\Memo;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Permission;

class PenungguanController extends Controller implements HasMiddleware
{
    protected PenungguanRepository $repository;

    public function __construct(PenungguanRepository $repository)
    {
        $this->repository = $repository;
    }
    public static function middleware(): array
    {
        return [
            new Middleware('can:penungguan-index', only: ['index', 'data']),
            new Middleware('can:penungguan-create', only: ['store']),
            new Middleware('can:penungguan-update', only: ['update']),
            new Middleware('can:penungguan-delete', only: ['destroy']),
        ];
    }
    private function gate(): array
    {
        $user = auth()->user();
        return Memo::forHour('penungguan-gate-' . $user->getKey(), function () use ($user) {
            return [
                'create' => $user->can('penungguan-create'),
                'update' => $user->can('penungguan-update'),
                'delete' => $user->can('penungguan-delete'),
            ];
        });
    }

    public function index()
    {
        $gate = $this->gate();
        return inertia('transaksi/penungguan/index', compact("gate"));
    }

    public function create()
    {
        abort(404);
    }

    public function store(StoreRequest $request)
    {
        $this->repository->store($request);
        back()->with('success', 'Data berhasil ditambahkan');
    }

    public function show(string $id)
    {
        abort(404);
    }

    public function edit(string $id)
    {
        abort(404);
    }

    public function update(UpdateRequest $request, Penungguan $penungguan)
    {
        $this->repository->update($penungguan->id, $request);
        back()->with('success', 'Data berhasil diubah');
    }

    public function destroy(Penungguan $penungguan)
    {
        $this->repository->delete($penungguan->id);
        back()->with('success', 'Data berhasil dihapus');
    }
}
