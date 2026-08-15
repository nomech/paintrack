import { z } from "zod";

const configSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535),
});

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  const issues = parsedConfig.error.issues
    .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  console.error(`Invalid environment configuration:\n${issues}`);
  process.exit(1);
}

export type Config = z.infer<typeof configSchema>;
export const config: Config = parsedConfig.data;
