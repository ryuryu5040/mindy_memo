<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Node;
use App\Models\Edge;


class Memo extends Model
{
    use HasFactory;

    protected $fillable = [
        "title"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function node()
    {
        return $this->hasMany(Node::class);
    }

    public function edge()
    {
        return $this->hasMany(Edge::class);
    }

}
