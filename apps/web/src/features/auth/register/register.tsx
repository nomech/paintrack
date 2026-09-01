import shared from "./../../shared/shared.module.css";
import { useForm } from "react-hook-form";
import { registrationSchema as registerData } from "@paintrack/shared/schemas";
import type { registrationSchema } from "@paintrack/shared/schemas";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Register = () => {
  const [serverError, setServerError] = useState<string>("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<registrationSchema>();

  if (errors) {
    console.log(errors);
  }

  const onSubmit = async (data: registrationSchema) => {
    console.log("submitting");
    setServerError("");

    // Validate with Zod
    const result = registerData.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((err) => {
        const path = err.path[0] as keyof registrationSchema;
        setError(path, { message: err.message });
      });
      return;
    }

    try {
      const registerResult = await fetch("http://localhost:3000/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (registerResult.ok) {
        navigate({ to: "/" });
      } else {
        setServerError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setServerError("Registration failed: " + err);
    }
  };

  return (
    <>
      <div className={shared.formContainer}>
        <form className={shared.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Create your account</h2>
          <p>
            Track every paint on your shelf — opened, unopened, and everything
            in between.
          </p>
          <div className={shared.inputGroup}>
            <label htmlFor="displayName" className={shared.label}>
              Display name
            </label>
            <input
              className={shared.input}
              type="text"
              placeholder="e.g. John Doe"
              {...register("displayName", { required: true, min: 3 })}
            />
          </div>
          <div className={shared.inputGroup}>
            <label htmlFor="email" className={shared.label}>
              Email
            </label>
            <input
              className={shared.input}
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && (
            <p className={shared.error}>{errors.email.message}</p>
          )}
          <div className={shared.inputGroup}>
            <label htmlFor="password" className={shared.label}>
              Password
            </label>
            <input
              className={shared.input}
              type="password"
              placeholder="******"
              {...register("password", {
                required: true,
                min: 16,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
                  message:
                    "Password must include lowercase, uppercase, a number, and a special character",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className={shared.error}>{errors.password.message}</p>
          )}
          <div className={shared.inputGroup}>
            <label htmlFor="confirmPassword" className={shared.label}>
              Confirm Password
            </label>
            <input
              className={shared.input}
              type="password"
              placeholder="******"
              {...register("confirmPassword", { required: true })}
            />
          </div>

          {serverError && <p className={shared.error}>{serverError}</p>}
          {errors && (
            <p className={shared.error}>Please check the form for errors.</p>
          )}

          <button
            className={shared.submitButton}
            type="submit"
            value="Create account"
            disabled={isSubmitting}
          >
            Create account
          </button>

          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </>
  );
};
