export interface Pjl {
  nim: string;
  nama: string;
  line: string;
}

export interface Kelompok {
  id_kelompok: string;
  nama_kelompok: string;
}

export interface Distrik {
  id_distrik: string;
  nama_distrik: string;
  list_pjl: Pjl[];
  list_kelompok: Kelompok[];
}

export interface AnggotaMaba {
  nama: string;
  nim: string;
  prodi: string;
  line: string;
  telp: string;
  kelompok: string;
}