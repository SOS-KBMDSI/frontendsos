"use client";

import { Modal } from "@/shared/components/ui/Modal";
import { useState } from "react";
import { MahasiswaDetailView } from "./MahasiswaDetailModal";
import { useMahasiswaDetail } from "../hooks/useMahasiswaDetail";

interface DetailModalTriggerProps {
  nim: string;
}

export const DetailModalTrigger = ({ nim }: DetailModalTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: profile,
    isLoading,
    error,
    fetchProfile,
  } = useMahasiswaDetail();

  const handleOpenModal = () => {
    setIsOpen(true);
    fetchProfile(nim);
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="detail-link font-semibold text-primary-500 border-b border-primary-500"
      >
        Detail
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Detail Mahasiswa"
      >
        <MahasiswaDetailView
          isLoading={isLoading}
          error={error}
          mahasiswa={profile}
        />
      </Modal>
    </>
  );
};
