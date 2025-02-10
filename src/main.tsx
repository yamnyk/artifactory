import { render } from 'preact';
import { BrowserRouter } from 'react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import AppRoutes from '@/routing/';
import { ArtifactsProvider } from '@/context/artifacts';

import './index.css';

render(
  <BrowserRouter>
    <ChakraProvider value={defaultSystem}>
      <ArtifactsProvider>
        <AppRoutes />
      </ArtifactsProvider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('app')!
);
