import ConversationBar from '@/components/molecules/conversation-bar/conversation-bar';
import ChatHeader from '@/components/organisms/chat-header/chat-header';
import SuggestionList from '@/components/organisms/suggestion-list/suggestion-list';
import { CompassIcon, LightbulbIcon, PenToolIcon, MapIcon } from 'lucide-react';
import React, { useState } from 'react';

interface Suggestion {
  icon: React.ReactElement;
  text: string;
}

const ChatbotInterface: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userName, setUserName] = useState<string>('Luiz Belipestre');

  const suggestions: Suggestion[] = [
    {
      icon: <CompassIcon className="h-6 w-6" />,
      text: 'Me mostre as melhores praias de Fernando de Noronha...',
    },
    {
      icon: <LightbulbIcon className="h-6 w-6" />,
      text: 'Faça um "Olá mundo!" em JavaScript...',
    },
    {
      icon: <PenToolIcon className="h-6 w-6" />,
      text: 'Me ajude a escrever uma música que fala de amor...',
    },
    {
      icon: <MapIcon className="h-6 w-6" />,
      text: 'Monte um roteiro de viagem para a ilha de Madagascar...',
    },
  ];

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center bg-[#001726] p-6 text-white md:w-full md:p-0">
        <div className="flex w-full flex-col justify-start gap-y-64 md:pl-3 lg:w-9/12">
          <div className="flex-1">
            <ChatHeader userName={userName} />
            <SuggestionList suggestions={suggestions} />
          </div>
          <ConversationBar />
        </div>
      </div>
    </div>
  );
};

export default ChatbotInterface;
