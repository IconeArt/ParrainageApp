export function validateImageFile(file: File) {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

  if (!ACCEPTED_TYPES.includes(file.type)) {
    throw new Error('Format de fichier non supporté. Utilisez JPG, PNG ou WebP');
  }

  if (file.size > MAX_SIZE) {
    throw new Error('L\'image doit faire moins de 5MB');
  }

  return true;
}