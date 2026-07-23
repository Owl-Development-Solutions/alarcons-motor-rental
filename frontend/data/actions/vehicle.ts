"use server";

import { cookies } from "next/headers";
import { toDomainError } from "../errors/domain.error";
import {
  CreateVehicleInput,
  serverFetch,
  UpdateVehicleInput,
  Vehicle,
  VehicleDetailResponse,
  VehicleResponse,
} from "../models";
import { revalidatePath } from "next/cache";
import { updateVehicleSchema } from "@/lib/validator";

export const getVehicles = async (): Promise<VehicleResponse> => {
  try {
    return await serverFetch<VehicleResponse>("/vehicles");
  } catch (error) {
    throw toDomainError(error);
  }
};

export const getVehicle = async (
  vehicleId: string,
): Promise<VehicleDetailResponse> => {
  try {
    const res = await serverFetch<VehicleDetailResponse>(
      `/vehicle/${vehicleId}`,
      {
        method: "GET",
      },
    );

    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};

export const createVehicle = async (
  data: CreateVehicleInput,
): Promise<{ message: string }> => {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    const res = await serverFetch<{ message: string }>(
      `/admin/vehicles`,
      {
        method: "POST",
        data,
      },
      token,
    );
    revalidatePath(`/admin/vehicles`);
    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};

export const updateVehicle = async (
  data: UpdateVehicleInput,
): Promise<{ message: string }> => {
  const token = (await cookies()).get("auth_token")?.value;
  try {
    const vehicle = updateVehicleSchema.parse(data);

    console.log(vehicle);

    const res = await serverFetch<{ message: string }>(
      `/admin/vehicles/${vehicle.id}`,
      {
        method: "PUT",
        data: vehicle,
      },
      token,
    );

    revalidatePath(`/admin/vehicles`);

    return res;
  } catch (error) {
    throw toDomainError(error);
  }
};
