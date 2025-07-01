import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { authService } from "@/api/services/auth";

export function useLoginForm() {
  const [emailornim, setEmailornim] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({ emailornim, password });

      const redirectUrl = response.redirectUrl;
      console.log(redirectUrl);

      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      console.error("Login failed:", err);
      let message = "Login gagal. Periksa kembali email dan password Anda.";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message;
      } else if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    emailornim,
    setEmailornim,
    password,
    setPassword,
    isLoading,
    error,
    handleSubmit,
  };
}
