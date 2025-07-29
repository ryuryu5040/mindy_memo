<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Memo;

class Edge extends Model
{
    use HasFactory;

        protected $fillable = [
        'memo_id',
        'start_node',
        'end_node'
    ];

    public function memo()
    {
        return $this->belongsTo(Memo::class);
    }
}
