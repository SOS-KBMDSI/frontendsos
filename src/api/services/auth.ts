import { apiClient, ApiResponse } from "../core/AxiosInstance";
import axios from "axios";

export interface AuthProfile {
  nim: string;
  full_name: string;
  nama: string;
  faculty: string;
  study_program: string;
  siakad_photo_url: string;
  file_filkom_photo_url: string;
  role: "admin" | "user";
}

interface LoginResponse {
  message: string;
  profile: AuthProfile;
}

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: {
    emailornim: string;
    password: string;
  }): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      "/api/auth/login",
      credentials
    );
    return response.data;
  }

  async logout(): Promise<void> {
    await axios.post("/api/auth/logout");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  async getMe(): Promise<ApiResponse<AuthProfile>> {
    try {
      const response = await apiClient.get<AuthProfile>("/api/mahasiswa");
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Gagal mengambil data pengguna.");
    }
  }
}

export const authService = AuthService.getInstance();
