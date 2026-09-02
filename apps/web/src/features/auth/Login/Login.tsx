import shared from "./../../shared/shared.module.css";
import { useForm } from "react-hook-form";
import { loginSchema } from "@paintrack/shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useState } from "react";
import { useAuth } from "../comtext/useAuth";

export const Login = () => {
  const [serverError, setServerError] = useState<string>("");
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginSchema) => {
    const result = await signIn(data.email, data.password);
    if (!result.success) {
      setServerError(result.error ?? "Login failed");
    }
  };

  return (
    <>
      <div className={shared.formContainer}>
        <form className={shared.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Welcome!</h2>
          <p>Log in to your paint rack</p>
          <div className={shared.inputGroup}>
            <label htmlFor="email" className={shared.label}>
              Email
            </label>
            <input
              className={shared.input}
              type="email"
              placeholder="you@example.com"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className={shared.error}>{errors.email.message}</p>
          )}
          <div className={shared.inputGroup}>
            <div className={shared.label}>
              <label htmlFor="password" className={shared.label}>
                Password
              </label>{" "}
              <a href="/forgot-password" className={shared.forgotPasswordLink}>
                {" "}
                Forgot password?
              </a>
            </div>
            <input
              className={shared.input}
              type="password"
              placeholder="******"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className={shared.error}>{errors.password.message}</p>
          )}

          {serverError && <p className={shared.error}>{serverError}</p>}

          <button
            className={shared.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </form>
      </div>
    </>
  );
};
