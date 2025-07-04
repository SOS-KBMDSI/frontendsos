"use client";

import { Modal } from "@/shared/components/ui/Modal";
import { useState } from "react";
import { AnggotaDetailModal } from "./AnggotaDistrikModal";
import { useAnggotaDetail } from "../hooks/useAnggotaDetail";
import { Button } from "@/shared/components/ui/Button";

interface DetailAnggotaModalTriggerProps {
  nim: string;
}

export const DetailAnggotaModalTrigger = ({ nim }: DetailAnggotaModalTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: profile,
    isLoading,
    error,
    fetchProfile,
  } = useAnggotaDetail();

  const handleOpenModal = () => {
    setIsOpen(true);
    fetchProfile(nim);
  };

  return (
    <>
      <Button
        variant="transparent"
        size="small"
        onClick={handleOpenModal}
        className="pb-0 font-semibold h-auto text-primary-500 underline underline-offset-4"
      >
        Detail
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Detail Mahasiswa"
      >
        <AnggotaDetailModal
          isLoading={isLoading}
          error={error}
          mahasiswa={profile}
        />
      </Modal>
    </>
  );
};