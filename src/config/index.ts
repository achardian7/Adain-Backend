import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform((val) => parseInt(val, 10)),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  WHITELIST: z
    .string()
    .default('')
    .transform((val) => (val ? val.split(',') : [])),
  MONGO_URI: z.url(),
  LOG_LEVEL: z.string().default('info'),
  SECRET: z.string(),
  EXPIRES_IN: z.enum(['7d', '15d', '30d']).default('7d'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables');
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2));

  process.exit(1);
}

const config = parsedEnv.data;

export default config;
