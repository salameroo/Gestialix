<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;

class AsistenciasExport implements FromArray, WithEvents
{
    // Datos para poblar la hoja
    public function array(): array
    {
        return [
            // Encabezados
            ['Día', 'Alumnos (Infantil + Primaria)', 'Fijos', 'Ocasionales', 'Personal DGA', 'Monitoras', 'Usuarios Ocasionales', 'Total'],
            // Datos de ejemplo
            [1, 20, 15, 5, 2, 3, 1, 26],
            [2, 25, 18, 7, 3, 2, 0, 30],
            [3, 30, 20, 10, 5, 4, 1, 40],
            // Agrega más filas según sea necesario...
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet;

                // Quitar las líneas de cuadrícula
                $sheet->getDelegate()->setShowGridlines(false);

                // Fondo blanco
                $sheet->getStyle('A1:H50')->applyFromArray([
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['argb' => 'FFFFFF']
                    ],
                ]);

                // ENCABEZADO
                $sheet->getDelegate()->mergeCells('B1:H1');
                $sheet->getDelegate()->setCellValue('B1', 'Mes: Nº de menús servidos');
                $sheet->getStyle('B1:H1')->applyFromArray([
                    'font' => ['bold' => true, 'size' => 14],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical' => Alignment::VERTICAL_CENTER,
                    ],
                ]);

                // Bordes de la tabla
                $sheet->getStyle('A1:H50')->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['argb' => '000000'],
                        ],
                    ],
                ]);

                // Totales
                $sheet->getDelegate()->mergeCells('A35:B35');
                $sheet->getDelegate()->setCellValue('A35', 'TOTAL');
                $sheet->getStyle('A35')->applyFromArray([
                    'font' => ['bold' => true],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                    ],
                ]);

                // Comprobación: "¡¡ Correcto !!"
                $sheet->getDelegate()->mergeCells('C36:E36');
                $sheet->getDelegate()->setCellValue('C36', '¡¡ Correcto !!');
                $sheet->getStyle('C36:E36')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'color' => ['argb' => 'FFFF00'], // Amarillo
                    ],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical' => Alignment::VERTICAL_CENTER,
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['argb' => '0000FF'], // Fondo azul
                    ],
                ]);

                // Vº Bº Empresa
                $sheet->getDelegate()->mergeCells('F38:H38');
                $sheet->getDelegate()->setCellValue('F38', 'Vº Bº Empresa');
                $sheet->getStyle('F38:H38')->applyFromArray([
                    'font' => ['italic' => true],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical' => Alignment::VERTICAL_CENTER,
                    ],
                ]);
            },
        ];
    }
}
