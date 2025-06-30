import { Button } from "@/shared/components/ui/Button";
import React from "react";

interface LoginFormProps {
  emailornim: string;
  setEmailornim: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  handleSubmit: (event: React.FormEvent) => void;
}

export default function LoginForm({
  emailornim,
  setEmailornim,
  password,
  setPassword,
  isLoading,
  error,
  handleSubmit,
}: LoginFormProps) {
  return (
    <div className="mx-auto my-20 max-w-sm rounded-xl border bg-white shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center">Login dulu ya wak</h1>
        <p className="text-center text-gray-500 text-sm mt-1 mb-6">
          Silakan masuk untuk melanjutkan
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="emailornim">Email atau NIM</label>
              <input
                id="emailornim"
                type="text"
                placeholder="Masukkan email atau NIM Anda"
                value={emailornim}
                onChange={(e) => setEmailornim(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" disabled={isLoading} className="w-full mt-2">
              {isLoading ? "Memproses..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
