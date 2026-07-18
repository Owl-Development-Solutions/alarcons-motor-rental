"use server";

import { toDomainError } from "../errors/domain.error";
import {
  serverFetch,
  Vehicle,
  VehicleDetailResponse,
  VehicleResponse,
} from "../models";

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
