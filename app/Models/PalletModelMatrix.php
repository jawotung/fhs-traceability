<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PalletModelMatrix extends Model
{
    use HasFactory;
    protected $fillable = [
        'model',
        'model_name',
        'box_count_per_pallet',
        'is_deleted',
        'create_user',
        'update_user'
    ];
}