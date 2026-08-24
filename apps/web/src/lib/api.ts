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
