<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class PeticioneUser extends Pivot
{
    use HasFactory;

    protected $table = 'peticione_user';
}
