<?php

namespace App\Enums;

enum StatusTTEPegawai: string
{
    case ACTIVE = 'y';
    case NO = 'n';

    public function value(): string
    {
        return match ($this) {
            self::ACTIVE => 'y',
            self::NO => 'n',
        };
    }

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Ya',
            self::NO => 'Tidak',
        };
    }

    public function boolean(): string
    {
        return match ($this) {
            self::ACTIVE => true,
            self::NO => false,
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::ACTIVE => 'bg-blue-500 dark:bg-blue-600',
            self::NO => 'bg-red-500 dark:bg-red-600',
        };
    }

    public static function toArray(): array
    {
        return array_map(fn($case) => [
            'label' => $case->label(),
            'value' => $case->value,
            'color' => $case->color(),
            'boolean' => $case->boolean(),
        ], self::cases());
    }
}
