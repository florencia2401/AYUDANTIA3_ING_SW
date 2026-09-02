import { z } from 'zod';


export const createBrandSchema = z.object({
  name: z
    .string({ required_error: 'El nombre de la marca es obligatorio' })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede exceder los 80 caracteres')
    .trim(),
  country: z
    .string()
    .max(60, 'El país no puede superar los 60 caracteres')
    .trim()
    .optional(),
  website: z
    .string()
    .url('El sitio web debe ser una URL válida (ej: https://www.marca.com)')
    .max(200, 'La URL no puede superar los 200 caracteres')
    .optional()
});


export const updateBrandSchema = createBrandSchema.partial();


export const brandIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'El ID de la marca debe ser un número entero')
    .transform(Number)
});
