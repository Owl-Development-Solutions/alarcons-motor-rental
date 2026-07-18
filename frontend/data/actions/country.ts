"use server";

import { Country } from "../models";

export async function getCountries(): Promise<Country[]> {
  const res = await fetch("https://countries.dev/countries", {
    method: "GET",
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch countries");
  }

  const data = await res.json();

  return data;
}
