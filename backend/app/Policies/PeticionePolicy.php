<?php

namespace App\Policies;

use App\Models\Peticione;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PeticionePolicy
{
    use HandlesAuthorization;


    public function view(User $user, Peticione $peticione)
    {
        return $user->id === $peticione->user_id || $user->role_id === 1;
    }


    public function update(User $user, Peticione $peticione)
    {
        return $user->id === $peticione->user_id;
    }


    public function delete(User $user, Peticione $peticione)
    {
        return $user->id === $peticione->user_id || $user->role_id === 1;
    }


    public function cambiarEstado(User $user, Peticione $peticione)
    {
        return $user->id === $peticione->user_id || $user->role_id === 1;
    }


    public function firmar(User $user, Peticione $peticione)
    {
        return $user->id !== $peticione->user_id;
    }
}
