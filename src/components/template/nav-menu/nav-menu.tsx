import React, { useState } from 'react';
import {
  BadgeInfo,
  CirclePlus,
  Lightbulb,
  Menu,
  MessageCircleMore,
  Search,
  X,
  ArrowLeft,
} from 'lucide-react';
import LogoPandora from '../../../../public/SymbolText.svg';
import Image from 'next/image';
import Badge from '@/components/atoms/badge/badge';
import { CircleFadingArrowUp } from 'lucide-react';
import UserProfile from '@/components/molecules/user-profile/UserProfile';
import SupportModal from '@/components/organisms/support-modal/support-modal';
import UpgradeModal from '@/components/organisms/upgrade-modal/upgrade-modal';

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Implementar lógica de pesquisa
  };

  return (
    <div className="relative">
      {/* Botão de menu */}
      <button
        onClick={toggleMenu}
        className="fixed left-4 top-4 z-20 rounded-md bg-transparent p-2 text-white transition-opacity hover:opacity-90"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu lateral */}
      <div
        className={`fixed left-0 top-0 z-10 h-full w-64 transform bg-[#0D3451] p-4 text-white transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {isSearchOpen ? (
          <div className="mb-4 mt-16 flex items-center">
            <button onClick={toggleSearch} className="mr-2 text-white">
              <ArrowLeft size={24} />
            </button>
            <input
              type="text"
              placeholder="Pesquisar chats..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full rounded-md bg-[#1E4A6D] px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#40B6FC]"
            />
          </div>
        ) : (
          <>
            <div className="-ml-16 mb-8 mt-16">
              <Image className="h-12" src={LogoPandora} alt="Pandora Logo" />
            </div>

            <nav>
              <ul className="flex flex-col gap-3 space-y-4">
                <li>
                  <button
                    onClick={toggleSearch}
                    className="flex w-full items-center gap-2 text-white transition-colors hover:text-[#40B6FC]"
                  >
                    <Search className="h-5 w-5" /> Pesquisa
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-white transition-colors hover:text-[#40B6FC]"
                  >
                    <CircleFadingArrowUp className="h-5 w-5" />
                    <UpgradeModal />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-white transition-colors hover:text-[#40B6FC]"
                  >
                    <BadgeInfo className="h-5 w-5" />
                    <SupportModal />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-white transition-colors hover:text-[#40B6FC]"
                  >
                    <Lightbulb className="h-5 w-5" /> Sugestões{' '}
                    <Badge text="Em Breve" />
                  </a>
                </li>
              </ul>
            </nav>

            <div className="mt-16">
              <h2 className="mb-2 text-[#40B6FC]">Chat History</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-start gap-2 text-sm text-white transition-colors hover:text-[#40B6FC]"
                  >
                    <MessageCircleMore className="h-6 w-6" /> Estudo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-start gap-2 text-sm text-white transition-colors hover:text-[#40B6FC]"
                  >
                    <MessageCircleMore className="h-6 w-6" /> Projetos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-start gap-2 text-sm text-white transition-colors hover:text-[#40B6FC]"
                  >
                    <MessageCircleMore className="h-6 w-6" /> Favoritos
                  </a>
                </li>
              </ul>
            </div>

            <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[#40B6FC] to-[#0089DB] px-4 py-3 text-white transition hover:opacity-90 active:scale-95 active:bg-gradient-to-r active:from-[#0089DB] active:to-[#40B6FC]">
              <CirclePlus className="h-5 w-5" />
              New Chat
            </button>

            <div className="absolute bottom-8 left-4 flex items-center">
              <UserProfile />
            </div>
          </>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-0 bg-black bg-opacity-50"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
