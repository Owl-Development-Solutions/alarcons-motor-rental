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
import { UTApi } from "uploadthing/server";
import { PAGES_DIR_ALIAS } from "next/dist/lib/constants";
import { PaginatedResponse } from "../models/paginated.model";
import { VehicleFilters } from "../models/vehicle.filter";

const utapi = new UTApi();

export const getVehicles = async (
  filters: VehicleFilters = {},
): Promise<VehicleResponse> => {
  try {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });

    const query = params.toString();

    return await serverFetch<VehicleResponse>(
      `/vehicles${query ? `?${query}` : ""}`,
      {
        method: "GET",
      },
    );
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

export const deleteVehicle = async (vehicle: Vehicle): Promise<void> => {
  const token = (await cookies()).get("auth_token")?.value;

  try {
    await serverFetch<void>(
      `/admin/vehicles/${vehicle.id}`,
      {
        method: "DELETE",
      },
      token,
    );

    const fileKeys = vehicle.images
      .map((url) => url.split("/").pop())
      .filter(Boolean) as string[];

    await utapi.deleteFiles(fileKeys);

    revalidatePath(`/admin/vehicles`);
  } catch (error) {
    throw toDomainError(error);
  }
};

// @TODO PLEASE USE THE CORRECT VEHICLE WHEN ON GETTING THE NEXT PAGES
/**
 * Fetches a specific page of vehicles using the full URL Laravel
 * returns in `next_page_url` / `prev_page_url`.
 *
 * Kept as a server action so your API base URL / auth token / API key
 * never has to be exposed to the client.
 */
export async function getVehiclesByUrl(url: string): Promise<VehicleResponse> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      // Authorization: `Bearer ${process.env.API_TOKEN}`, // if needed
    },
    // Avoid Next.js caching stale pages of an infinite list
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch vehicles: ${res.status}`);
  }

  return res.json();
}
