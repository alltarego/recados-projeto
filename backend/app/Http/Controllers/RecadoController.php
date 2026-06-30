<?php

namespace App\Http\Controllers;

use App\Models\Recado;
use Illuminate\Http\Request;

class RecadoController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->recados;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'texto' => 'required|string',
        ]);

        $recado = $request->user()->recados()->create($validated);

        return response()->json($recado, 201);
    }

    public function destroy(Recado $recado, Request $request)
    {
        if ($recado->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $recado->delete();
        return response()->json(['message' => 'Recado deleted']);
    }
}