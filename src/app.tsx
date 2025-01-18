import { useState, useEffect } from 'preact/hooks';
import { Box } from '@chakra-ui/react';

import { useArtifacts } from '@/context/artifacts';

import Layout from '@/layout';
import { RecentArtifacts } from '@/pages';

import './app.css';

export function App() {
  const { artifacts, error } = useArtifacts();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Layout>
      {showError && error && (
        <Box
          position="fixed"
          bottom="4"
          right="4"
          bg="red.500"
          color="white"
          px="4"
          py="2"
          borderRadius="md"
          shadow="lg"
        >
          {error.message}
        </Box>
      )}

      {artifacts && <RecentArtifacts />}
    </Layout>
  );
}
