// pages/_app.tsx
import React, { useEffect } from 'react';
import '../src/app/globals.css';
import i18n from '@/utils/i18n';
import { I18nextProvider } from 'react-i18next';
import { AppProps } from 'next/app';

// Importando o roteamento da pasta routes
import AppRoutes from '../routes/AppRoutes';

// Esta é a assinatura padrão do componente _app
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {/* Passando o Component como children */}
      <AppRoutes>
        <Component {...pageProps} />
      </AppRoutes>
    </I18nextProvider>
  );
}

export default MyApp;
