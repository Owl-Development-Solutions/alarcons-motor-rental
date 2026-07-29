<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminDashboardResource;
use App\Services\AdminDashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(private AdminDashboardService $dashboardService) {}

    public function show(Request $request): AdminDashboardResource
    {
        return new AdminDashboardResource($this->dashboardService->getDashboard($request->user()));
    }
}
