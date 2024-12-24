import React from 'react';
import { UserPlus } from 'lucide-react';
import { ParticipantPair } from '../../types/participant';

interface PairingListProps {
  pairs: ParticipantPair[];
}

export function PairingList({ pairs }: PairingListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <UserPlus className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Parrainages</h2>
      </div>
      
      <div className="divide-y">
        {pairs.length === 0 ? (
          <p className="text-gray-500 py-4">Aucun parrainage effectué</p>
        ) : (
          pairs.map((pair) => (
            <div key={pair.id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={pair.parrain.imageUrl}
                    alt={`${pair.parrain.firstName} ${pair.parrain.lastName}`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">Parrain: {pair.parrain.firstName} {pair.parrain.lastName}</p>
                    <p className="text-sm text-gray-500">{pair.parrain.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-medium">Filleul: {pair.filleul.firstName} {pair.filleul.lastName}</p>
                    <p className="text-sm text-gray-500">{pair.filleul.email}</p>
                  </div>
                  <img
                    src={pair.filleul.imageUrl}
                    alt={`${pair.filleul.firstName} ${pair.filleul.lastName}`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}