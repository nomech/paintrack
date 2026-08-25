import type { Brand } from "@paintrack/shared/schemas.js";

const API_BASE_URL = import.meta.env.VITE_API_BASEURL;

export type HealthResponse = {
  status: string;
  version: string;
  uptime: number;
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(new URL("v1/health", API_BASE_URL));
  if (!response.ok) {
    throw new Error(`Health check failed: ${response.status}`);
  }
  return response.json();
}

export const getBrands = async (): Promise<Brand[]> => {
  const response = await fetch("http://localhost:3000/v1/brands");
  const data = await response.json();

  return data;
};

export const getBrand = async (id: number): Promise<Brand[]> => {
  const response = await fetch(`http://localhost:3000/v1/brands?brandId=${id}`);
  const data = await response.json();

  return data;
};
