import {
  CheckSquare,
  FileText,
  Star,
  Users,
  Search,
  Crown,
  LucideIcon,
} from "lucide-react";

export interface SidebarMenuItem {
  id: number;
  label: string;
  icon: LucideIcon;
  path: string;
}

const basePath = "/admin";

const baseSidebarItems = [
  {
    id: 1,
    label: "Presensi",
    icon: CheckSquare,
    path: "/presensi",
  },
  {
    id: 2,
    label: "Penugasan",
    icon: FileText,
    path: "penugasan",
  },
  {
    id: 3,
    label: "Penilaian",
    icon: Star,
    path: "penilaian",
  },
  {
    id: 4,
    label: "Daftar Distrik",
    icon: Users,
    path: "distrik",
  },
  {
    id: 5,
    label: "Cari Mahasiswa",
    icon: Search,
    path: "cari-mahasiswa",
  },
  {
    id: 6,
    label: "STF",
    icon: Crown,
    path: "stf",
  },
];

export const sidebarMenuItems: SidebarMenuItem[] = baseSidebarItems.map(
  (item) => ({
    ...item,

    path: `${basePath}/${item.path.replace(/^\//, "")}`,
  })
);
