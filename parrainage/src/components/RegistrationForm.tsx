import React from 'react';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { InputField } from './forms/InputField';
import { SelectField } from './forms/SelectField';
import { ImageUpload } from './forms/ImageUpload';
import { Button } from './ui/Button';
import { participantSchema } from '../schemas/participant';
import { createParticipant } from '../services/participant.service';
import { uploadImage } from '../services/storage.service';

const statusOptions = [
  { value: 'filleul', label: 'Filleul(e)' },
  { value: 'parrain', label: 'Parrain/Marraine' }
];

export function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    status: 'filleul'
  });
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleImageChange = (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast.error('Veuillez sélectionner une image');
      return;
    }

    try {
      setLoading(true);
      
      // Upload image to Supabase Storage
      const imageUrl = await uploadImage(image);
      
      // Create participant in database
      await createParticipant({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        imageUrl,
        status: formData.status as 'parrain' | 'filleul'
      });
      
      toast.success('Inscription réussie !');
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          toast.error(err.message);
        });
      } else {
        toast.error('Une erreur est survenue lors de l\'inscription');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Inscription au Parrainage
      </h2>
      
      <div className="space-y-6">
        <ImageUpload
          id="image"
          label="Photo de profil"
          onChange={handleImageChange}
          preview={imagePreview}
          required
        />

        <InputField
          id="firstName"
          label="Prénom"
          type="text"
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          required
        />

        <InputField
          id="lastName"
          label="Nom"
          type="text"
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          required
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
        />

        <SelectField
          id="status"
          label="Statut"
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "parrain" | "filleul" }))}
          options={statusOptions}
          required
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Inscription en cours...' : 'S\'inscrire'}
        </Button>
      </div>
    </form>
  );
}