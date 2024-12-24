import React from 'react';
import { Users } from 'lucide-react';
import { Participant } from '../../types/participant';

interface ParticipantListProps {
  participants: Participant[];
}

export function ParticipantList({ participants }: ParticipantListProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-4">
        <Users className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-semibold">Participants</h2>
      </div>
      
      <div className="divide-y">
        {participants.length === 0 ? (
          <p className="text-gray-500 py-4">Aucun participant inscrit</p>
        ) : (
          participants.map((participant) => (
            <div key={participant.id} className="py-4 flex items-center space-x-4">
              <img
                src={participant.imageUrl}
                alt={`${participant.firstName} ${participant.lastName}`}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{participant.firstName} {participant.lastName}</p>
                <p className="text-sm text-gray-500">{participant.email}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                participant.status === 'parrain' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              }`}>
                {participant.status === 'parrain' ? 'Parrain' : 'Filleul'}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}