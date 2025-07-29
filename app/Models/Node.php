<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Memo;

class Node extends Model
{
    use HasFactory;

    protected $fillable = [
        'memo_id',
        'type',
        'position_x',
        'position_y',
        'prime_text',
        'sub_text',
        'image_url'
    ];

    public function memo()
    {
        return $this->belongsTo(Memo::class);
    }

}
