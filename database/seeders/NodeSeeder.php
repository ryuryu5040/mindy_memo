<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('nodes')->insert([
            'memo_id'=> 1,
            'type' => 'LRHandle',
            'prime_text' => 'node1',
            'position_x' => 0,
            'position_y' => 0
        ] );
        DB::table('nodes')->insert([
            'memo_id'=> 1,
            'type' => 'LRHandle',
            'prime_text' => 'node2',
            'position_x' => 100,
            'position_y' => 0
        ] );
    }
}
