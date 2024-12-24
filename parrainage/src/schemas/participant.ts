import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const participantSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "L'image doit faire moins de 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Format accepté: .jpg, .jpeg, .png, .webp"
    ),
  status: z.enum(["parrain", "filleul"])
});