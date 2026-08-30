import shared from "./../../shared/shared.module.css";

import { useForm } from "react-hook-form";
import type { registrationSchema } from "@paintrack/shared/schemas";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registrationSchema>();

  const onSubmit = (data: registrationSchema) => console.log(data);
  console.log(errors);

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
          <div className={shared.inputGroup}>
            <label htmlFor="password" className={shared.label}>
              Password
            </label>
            <input
              className={shared.input}
              type="password"
              placeholder="******"
              {...register("email", {
                required: true,
                min: 16,
                pattern: /^\S+@\S+$/i,
              })}
            />
          </div>
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

          <input
            className={shared.submitButton}
            type="submit"
            value="Create account"
          />

          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </form>
      </div>
    </>
  );
};
