import { toast } from 'react-hot-toast';
import { AppwriteException } from 'appwrite';

export function handleError(error: unknown, customMessage?: string) {
  console.error('Error:', error);
  
  if (error instanceof AppwriteException) {
    toast.error(error.message);
  } else if (error instanceof Error) {
    toast.error(customMessage || error.message);
  } else {
    toast.error(customMessage || 'An unexpected error occurred');
  }
}

export function handleSuccess(message: string) {
  toast.success(message);
}