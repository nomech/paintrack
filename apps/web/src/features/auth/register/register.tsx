import styles from "./register.module.css";

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
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Create your account</h2>
          <p>
            Track every paint on your shelf — opened, unopened, and everything
            in between.
          </p>
          <div className={styles.inputGroup}>
            <label htmlFor="displayName">Display ame</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Display name"
              {...register("displayName", { required: true, min: 3 })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              {...register("email", {
                required: true,
                min: 16,
                pattern: /^\S+@\S+$/i,
              })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", { required: true })}
            />
          </div>

          <input type="submit" value="Create account" />
          <p>
            {" "}
            Already have an account? <a href="/login">Log in</a>{" "}
          </p>
        </form>
      </div>
    </>
  );
};
