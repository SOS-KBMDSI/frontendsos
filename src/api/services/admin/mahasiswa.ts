import { apiClient, ApiResponse } from "@/api/core/AxiosInstance";

export interface PJL {
  nim: string;
  nama: string;
  line: string;
}

export interface Distrik {
  id_distrik: string;
  nama_distrik: string;
  list_pjl: PJL[];
}

export interface Kelompok {
  id_kelompok: string;
  nama_kelompok: string;
  distrik: Distrik;
}

export interface MahasiswaDetail {
  nim: string;
  nama: string;
  email: string;
  fakultas: string;
  prodi: string;
  exp: number;
  telp: string;
  line: string;
  agama: string;
  golongan_darah: string;
  riwayat_penyakit: string;
  alergi_obat: string;
  alergi_makanan: string;
  kelompok: Kelompok;
}

class MahasiswaService {
  private static instance: MahasiswaService;

  public static getInstance(): MahasiswaService {
    if (!MahasiswaService.instance) {
      MahasiswaService.instance = new MahasiswaService();
    }
    return MahasiswaService.instance;
  }

  async getAllMahasiswa(): Promise<ApiResponse<MahasiswaDetail[]>> {
    try {
      const response = await apiClient.get<MahasiswaDetail[]>(
        "/api/mahasiswa/search"
      );
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Gagal mengambil semua data mahasiswa: ${error.message}`
        );
      }
      throw new Error("Terjadi kesalahan yang tidak diketahui.");
    }
  }
}

export const mahasiswaService = MahasiswaService.getInstance();
