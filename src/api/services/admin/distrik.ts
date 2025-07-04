import { apiClient } from "@/api/core/AxiosInstance";
import { AnggotaMaba, Distrik } from "@/feature/(admin)/distrik/type";

interface PaginatedData {
  records: AnggotaMaba[];
  pagination: object;
}

interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

class DistrikService {
  private static instance: DistrikService;

  public static getInstance(): DistrikService {
    if (!DistrikService.instance) {
      DistrikService.instance = new DistrikService();
    }
    return DistrikService.instance;
  }
  async getAllDistricts(): Promise<BackendResponse<Distrik[]>> {
    const response = await apiClient.get("/api/distrik");
    return response as unknown as BackendResponse<Distrik[]>;
  }

  async getDistrictById(id: string): Promise<BackendResponse<Distrik>> {
    const response = await apiClient.get(`/api/distrik/${id}`);
    return response as unknown as BackendResponse<Distrik>;
  }

  async getAnggotaByDistrictId(
    id: string,
    params: { page: number; limit: number }
  ): Promise<BackendResponse<PaginatedData>> {
    const response = await apiClient.get(`/api/distrik/${id}/maba`, {
      params,
    });
    return response as unknown as BackendResponse<PaginatedData>;
  }
}

export const distrikService = DistrikService.getInstance();