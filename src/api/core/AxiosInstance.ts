import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from "axios";
import Cookies from "js-cookie";

interface ApiErrorData {
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface BlobResponse {
  data: Blob;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  status: number;
}

class ApiCore {
  private client: AxiosInstance;
  private static instance: ApiCore;

  private constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.sos.com/v1",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiCore {
    if (!ApiCore.instance) {
      ApiCore.instance = new ApiCore();
    }
    return ApiCore.instance;
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.handleAuthError();
        }
        return Promise.reject(error);
      }
    );
  }

  public getAuthToken(): string | null {
    return Cookies.get("auth_token") || null;
  }

  public setAuthToken(token: string): void {
    Cookies.set("auth_token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  }

  private handleAuthError(): void {
    Cookies.remove("auth_token", { path: "/" });

    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const redirectParam = new URLSearchParams({
        redirect: currentPath,
      }).toString();
      window.location.href = `/login?${redirectParam}`;
    }
  }

  public isAuthenticated(): boolean {
    return this.getAuthToken() !== null;
  }

  public logout(): void {
    this.handleAuthError();
  }

  private handleApiError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as ApiErrorData | undefined;
      const errorMessage =
        errorData?.message ||
        error.message ||
        "An unexpected API error occurred";
      return new Error(errorMessage);
    }
    return new Error("An unexpected error occurred");
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  public async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<ApiResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  public async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  public async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<ApiResponse<T>>(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  public async getBlob(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<BlobResponse> {
    try {
      const response = await this.client.get<Blob>(url, {
        ...config,
        responseType: "blob",
      });
      return {
        data: response.data,
        headers: response.headers,
        status: response.status,
      };
    } catch (error) {
      throw this.handleApiError(error);
    }
  }
}

export const apiClient = ApiCore.getInstance();
