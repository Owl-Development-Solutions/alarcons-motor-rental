import axios from "axios";
import { CarRentalErrors } from "./car-rental.errors";

export function toDomainError(err: unknown): CarRentalErrors.DomainError {
  if (err instanceof CarRentalErrors.DomainError) {
    return err;
  }

  // Axios error
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const data = err.response?.data;

    switch (status) {
      case 401:
        return new CarRentalErrors.UnauthorizedError(
          data?.message ?? "Unauthorized",
        );

      case 404:
        return new CarRentalErrors.NotFoundError(data?.resource ?? "Resource");

      case 422:
        return new CarRentalErrors.ValidationError(
          data?.message ?? "Validation failed",
          data?.errors ?? {},
        );

      case 500:
        return new CarRentalErrors.ServerError(
          data?.message ?? "Internal server error",
        );

      default:
        return new CarRentalErrors.NetworkError(err.message, status);
    }
  }

  return new CarRentalErrors.NetworkError(
    err instanceof Error ? err.message : "An unexpected error occurred",
  );
}
