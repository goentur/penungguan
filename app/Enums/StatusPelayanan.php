<?php

namespace App\Enums;

enum StatusPelayanan: string
{
    case BARU = 'BARU';
    case OBJEK = 'OBJEK';
    case SUBJEK = 'SUBJEK';
    case KOLEKTIF = 'KOLEKTIF';
    case HAPUS = 'HAPUS';
    case INFORMASI = 'INFORMASI';

    public static function labels(): array
    {
        return [
            self::BARU->value => 'Baru (Objek & Subjek)',
            self::OBJEK->value => 'Hanya Objek Diubah',
            self::SUBJEK->value => 'Hanya Subjek Diubah',
            self::KOLEKTIF->value => 'Kolektif (Banyak Perubahan)',
            self::HAPUS->value => 'Hapus Objek',
            self::INFORMASI->value => 'Informasi SPPT',
        ];
    }

    public function label(): string
    {
        return self::labels()[$this->value];
    }

    public static function options(): array
    {
        return collect(self::cases())
            ->mapWithKeys(fn($case) => [$case->value => $case->label()])
            ->toArray();
    }
    public static function toSelectOptions(): array
    {
        return array_map(
            fn(self $case) => [
                'value' => $case->value,
                'label' => $case->label(),
            ],
            self::cases()
        );
    }
}
