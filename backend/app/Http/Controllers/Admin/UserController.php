<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Http\Resources\AdminUserResource;
use App\Models\User;
use App\Services\AdminUserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct(private AdminUserService $userService) {}

    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'role' => ['nullable', 'in:admin,customer,sales'],
            'is_active' => ['nullable', 'boolean'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:50'],
        ]);

        return AdminUserResource::collection($this->userService->list($filters))->response();
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        return (new AdminUserResource($this->userService->create($request->validated())))
            ->response()
            ->setStatusCode(201);
    }

    public function show(User $user): AdminUserResource { return new AdminUserResource($user->loadCount('bookings')); }

    public function update(UpdateUserRequest $request, User $user): AdminUserResource
    {
        return new AdminUserResource($this->userService->update($user, $request->validated()));
    }

    public function destroy(Request $request, User $user): JsonResponse
    {
        $this->userService->delete($user, $request->user());
        return response()->json(['message' => 'User deleted.']);
    }
}
