import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

export function useFormValidation<T extends z.ZodType>(schema: T) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = async (data: unknown) => {
    try {
      const validatedData = await schema.parseAsync(data);
      setErrors({});
      return validatedData;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
          toast.error(err.message);
        });
        setErrors(newErrors);
      }
      throw error;
    }
  };

  return { errors, validate };
}