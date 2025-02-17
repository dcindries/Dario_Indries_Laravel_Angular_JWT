<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;




Route::middleware(['cors'])->group(function () {
    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    Route::controller(\App\Http\Controllers\PeticioneController::class)->group(function () {
        Route::get('peticiones', 'index');
        Route::get('mispeticiones', 'listmine');  // Aquí se llama a listmine
        Route::get('peticiones/{id}', 'show');
        Route::delete('peticiones/{id}', 'delete');
        Route::put('peticiones/firmar/{id}', 'firmar');
        Route::put('peticiones/{id}', 'update');
        Route::put('peticiones/estado/{id}', 'cambiarEstado');
        Route::post('peticiones', 'store');
    });

    Route::controller(App\Http\Controllers\AuthController::class)->group(function () {
        Route::post('login', 'login');
        Route::post('register', 'register');
        Route::post('logout', 'logout');
        Route::post('refresh', 'refresh');
        Route::get('me', 'me');
    });
});
