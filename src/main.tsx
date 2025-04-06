import { render } from 'preact';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import { ArtifactsProvider } from './context/artifacts';
import { Router } from './routing';

import './index.css';

render(
  <ChakraProvider value={defaultSystem}>
    <ArtifactsProvider>
      <Router />
    </ArtifactsProvider>
  </ChakraProvider>,
  document.getElementById('app')!
);
