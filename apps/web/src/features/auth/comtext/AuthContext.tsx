import { createContext } from "react";
import type { AuthContextType } from "@paintrack/shared/schemas.js";

export const AuthContext = createContext<AuthContextType | null>(null);
