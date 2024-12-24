import { ID } from 'appwrite';
import { storage, BUCKET_ID } from '../lib/appwrite';
import { handleError } from '../utils/error-handling';

export async function uploadImage(file: File) {
  try {
    // Validate file
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error('Image must be less than 5MB');
    }

    // Upload to Appwrite
    const fileId = ID.unique();
    const response = await storage.createFile(
      BUCKET_ID,
      fileId,
      file
    );

    // Get file view URL
    const fileUrl = storage.getFileView(BUCKET_ID, fileId);
    return fileUrl.href;
  } catch (error) {
    handleError(error, 'Error uploading image');
    throw error;
  }
}