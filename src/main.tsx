import { render } from 'preact';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import { ArtifactsProvider } from '@/context/artifacts';

import { App } from './app.tsx';

import './index.css';

render(
  <BrowserRouter>
    <ChakraProvider value={defaultSystem}>
      <ArtifactsProvider>
        <Routes>
          <Route index element={<App />} />
        </Routes>
      </ArtifactsProvider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('app')!
);
