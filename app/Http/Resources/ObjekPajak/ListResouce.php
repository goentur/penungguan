<?php

namespace App\Http\Resources\ObjekPajak;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListResouce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'alamat' => $this->alamat,
        ];
    }
}
