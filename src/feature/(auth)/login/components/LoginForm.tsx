import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
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
    <div className="mx-auto h-fit z-20 w-full md:max-w-md max-w-sm lg:max-w-lg xl:max-w-2xl rounded-3xl shadow-lg bg-white ">
      <div className="p-6 md:p-14">
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-7 md:gap-8 mb-10 md:mb-20">
            <div className="flex flex-col space-y-2">
              <label
                className="text-base text-primary-500"
                htmlFor="emailornim"
              >
                Email atau NIM
              </label>
              <Input
                id="emailornim"
                type="text"
                placeholder="Email Atau NIM"
                value={emailornim}
                onChange={(e) => setEmailornim(e.target.value)}
                required
                variant={"default"}
                state={"default"}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-base text-primary-500" htmlFor="password">
                Kata Sandi
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Kata Sandi Siam"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
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
