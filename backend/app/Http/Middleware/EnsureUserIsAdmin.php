<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Register as 'admin' in bootstrap/app.php (Laravel 11+) or
 * app/Http/Kernel.php $middlewareAliases (Laravel 10).
 * Apply to any route only admins should reach, e.g. reviewPayment().
 */
class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || $user->role !== 'admin') {
            return response()->json([
                'message' => 'Forbidden. Admin access required.',
            ], 403);
        }

        return $next($request);
    }
}