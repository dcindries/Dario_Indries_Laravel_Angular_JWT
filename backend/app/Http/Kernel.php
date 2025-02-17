<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * The application's global HTTP middleware stack.
     *
     * Estos middleware se ejecutan en cada solicitud a la aplicación.
     *
     * @var array<int, class-string|string>
     */
    protected $middleware = [
        // \App\Http\Middleware\TrustHosts::class, // Opcional, si lo usas
        \App\Http\Middleware\TrustProxies::class,
        // Puedes comentar el middleware de CORS por defecto si vas a usar el personalizado
        // \Illuminate\Http\Middleware\HandleCors::class,
        \App\Http\Middleware\CORS::class, // Nuestro middleware CORS personalizado
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    ];

    /**
     * The application's route middleware groups.
     *
     * @var array<string, array<int, class-string|string>>
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            // \Illuminate\Session\Middleware\AuthenticateSession::class, // Opcional
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, // Si usas Sanctum
            \Illuminate\Routing\Middleware\ThrottleRequests::class . ':api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];

    /**
     * The application's route middleware.
     *
     * Estos middleware pueden asignarse a rutas o grupos de rutas.
     *
     * @var array<string, class-string|string>
     */
    protected $routeMiddleware = [
        'auth'         => \App\Http\Middleware\Authenticate::class,
        'auth.basic'   => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'auth.session' => \Illuminate\Session\Middleware\AuthenticateSession::class,
        'cache.headers'=> \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can'          => \Illuminate\Auth\Middleware\Authorize::class,
        'guest'        => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed'       => \App\Http\Middleware\ValidateSignature::class,
        'throttle'     => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified'     => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'cors'         => \App\Http\Middleware\CORS::class,
        'jwt.auth'     => \PHPOpenSourceSaver\JWTAuth\Http\Middleware\Authenticate::class,
        'jwt.refresh'  => \PHPOpenSourceSaver\JWTAuth\Http\Middleware\RefreshToken::class,
    ];

    /**
     * The application's middleware aliases.
     *
     * Los alias permiten asignar middleware a rutas de forma sencilla.
     *
     * @var array<string, class-string|string>
     */
    protected $middlewareAliases = [
        'auth'             => \App\Http\Middleware\Authenticate::class,
        'auth.basic'       => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'auth.session'     => \Illuminate\Session\Middleware\AuthenticateSession::class,
        'cache.headers'    => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can'              => \Illuminate\Auth\Middleware\Authorize::class,
        'guest'            => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'precognitive'     => \Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests::class,
        'signed'           => \App\Http\Middleware\ValidateSignature::class,
        'throttle'         => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified'         => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'jwt.auth'         => \PHPOpenSourceSaver\JWTAuth\Http\Middleware\Authenticate::class,
        'jwt.refresh'      => \PHPOpenSourceSaver\JWTAuth\Http\Middleware\RefreshToken::class,
        'cors'             => \App\Http\Middleware\CORS::class,
    ];
}
