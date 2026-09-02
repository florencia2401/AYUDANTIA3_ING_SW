
export const createReviewSchema = z.object({
  author: z
    .string({ required_error: 'El nombre del autor es obligatorio' })
    .min(2, 'El nombre del autor debe tener al menos 2 caracteres')
    .max(100, 'El nombre del autor no puede exceder los 100 caracteres')
    .trim(),
  rating: z
    .number({ required_error: 'La calificación (rating) es obligatoria' })
    .int('La calificación debe ser un número entero')
    .min(1, 'La calificación mínima es 1')
    .max(5, 'La calificación máxima es 5'),
  comment: z
    .string({ required_error: 'El comentario es obligatorio' })
    .min(10, 'El comentario debe tener al menos 10 caracteres')
    .max(500, 'El comentario no puede superar los 500 caracteres')
    .trim()
});


export const productIdParamSchema = z.object({
  id: z
    .string()

    .regex(/^\d+$/, 'El ID del producto debe ser un número entero')
    .transform(Number)
});
