import z from 'zod';

export const registerValidateSchema = z
  .object({
    fullName: z.string(),
    username: z.string(),
    email: z.email(),
    password: z
      .string()
      .min(8, { error: 'Password must have at least 8 characters long' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/, {
        error:
          'Password must contain uppercase, lowercase, number, and special character',
      }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: 'Password not match',
  });

export const loginValidateSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export const activationValidateSchema = z.object({
  code: z.string(),
});
