import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from "axios";

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
      baseURL: "/api/proxy",
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
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client.get<ApiResponse<T>>(url, config).then((res) => res.data);
  }

  public async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client
      .post<ApiResponse<T>>(url, data, config)
      .then((res) => res.data);
  }

  public async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client
      .put<ApiResponse<T>>(url, data, config)
      .then((res) => res.data);
  }

  public async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client
      .patch<ApiResponse<T>>(url, data, config)
      .then((res) => res.data);
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.client
      .delete<ApiResponse<T>>(url, config)
      .then((res) => res.data);
  }

  public async getBlob(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<BlobResponse> {
    const response = await this.client.get<Blob>(url, {
      ...config,
      responseType: "blob",
    });
    return {
      data: response.data,
      headers: response.headers,
      status: response.status,
    };
  }
}

export const apiClient = ApiCore.getInstance();
