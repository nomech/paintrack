import shared from "./../../shared/shared.module.css";
import { useForm } from "react-hook-form";
import { registrationSchema as registerData } from "@paintrack/shared/schemas";
import type { registrationSchema } from "@paintrack/shared/schemas";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Register = () => {
  const [serverError, setServerError] = useState<string>("");
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registrationSchema>({
    resolver: zodResolver(registerData),
  });

  if (errors) {
    console.log(errors);
  }

  const onSubmit = async (data: registrationSchema) => {
    setServerError("");
    setRegistered(false);

    try {
      const registerResult = await fetch("http://localhost:3000/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (registerResult.ok) {
        setRegistered(true);
        setTimeout(() => {
          navigate({ to: "/" });
        }, 1000);
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
              {...register("displayName")}
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
              {...register("email")}
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
              {...register("password")}
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
              {...register("confirmPassword")}
            />
          </div>

          {serverError && <p className={shared.error}>{serverError}</p>}

          <button
            className={shared.submitButton}
            type="submit"
            disabled={isSubmitting || registered}
          >
            {registered ? (
              "Account created successfully!"
            ) : isSubmitting ? (
              <>
                <LoaderCircle className={shared.animateSpin} />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </button>

          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </>
  );
};
