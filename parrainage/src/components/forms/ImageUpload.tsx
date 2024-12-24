import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  id: string;
  label: string;
  onChange: (file: File) => void;
  preview: string | null;
  error?: string;
  required?: boolean;
}

export function ImageUpload({
  id,
  label,
  onChange,
  preview,
  error,
  required = false
}: ImageUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors">
        <div className="space-y-1 text-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-32 w-32 object-cover rounded-full"
            />
          ) : (
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
          )}
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={id}
              className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
            >
              <span>Télécharger une photo</span>
              <input
                id={id}
                name={id}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleChange}
                required={required}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG jusqu'à 5MB</p>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}