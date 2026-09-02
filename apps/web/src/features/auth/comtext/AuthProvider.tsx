import { useState, type PropsWithChildren } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { type AuthContextType } from "@paintrack/shared/schemas";
import { AuthContext } from "./AuthContext";

type AuthProps = PropsWithChildren;

export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<string>("");

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (error) {
        setError(error);
        return { success: false, error: error };
      }

      setSession(data.session);
      setUser(data.user);
      setError("");
      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Authentication failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    session,
    user,
    isLoading,
    error,
    signIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
