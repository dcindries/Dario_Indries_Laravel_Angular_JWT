<?php

namespace App\Http\Controllers;

use App\Models\Peticione;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PeticioneController extends Controller
{
    public function index()
    {
        return response()->json(Peticione::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|max:255',
            'descripcion' => 'required',
            'destinatario' => 'required',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        $peticion = new Peticione($request->all());
        $peticion->user_id = Auth::id();
        $peticion->firmantes = 0;
        $peticion->estado = 'pendiente';
        $peticion->save();

        return response()->json($peticion, 201);
    }

    public function show($id)
    {
        $peticione = Peticione::findOrFail($id);
        $this->authorize('view', $peticione);

        return response()->json($peticione, 200);
    }

    public function update(Request $request, $id)
    {
        $peticione = Peticione::findOrFail($id);
        $this->authorize('update', $peticione);

        $peticione->update($request->all());
        return response()->json($peticione, 200);
    }

    public function listmine(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }
        $misPeticiones = $user->peticiones()->get();
        return response()->json($misPeticiones, 200);
    }


    public function delete($id)
    {
        $peticione = Peticione::findOrFail($id);
        $this->authorize('delete', $peticione);

        $peticione->delete();
        return response()->json(['message' => 'Petición eliminada'], 200);
    }

    public function firmar($id)
    {
        $peticione = Peticione::findOrFail($id);
        $this->authorize('firmar', $peticione);

        $peticione->firmantes += 1;
        $peticione->save();

        return response()->json($peticione, 200);
    }



    public function cambiarEstado($id)
    {
        $peticione = Peticione::findOrFail($id);
        $this->authorize('cambiarEstado', $peticione);

        $peticione->estado = 'aceptada';
        $peticione->save();

        return response()->json($peticione, 200);
    }
}
