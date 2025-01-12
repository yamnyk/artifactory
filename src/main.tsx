import { render } from 'preact';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import { App } from './app.tsx';
import './index.css';

render(
    <BrowserRouter>
        <ChakraProvider value={defaultSystem}>
            <Routes>
                <Route index element={<App />} />
            </Routes>
        </ChakraProvider>
    </BrowserRouter>
    , document.getElementById('app')!);
