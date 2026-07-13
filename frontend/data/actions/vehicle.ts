"use server";

import { toDomainError } from "../errors/domain.error";
import { serverFetch, VehicleResponse } from "../models";

export const getVehicles = async (): Promise<VehicleResponse> => {
  try {
    return await serverFetch<VehicleResponse>("/vehicles");
  } catch (error) {
    throw toDomainError(error);
  }
};
