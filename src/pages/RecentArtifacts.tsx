import { FC, useEffect, useState } from 'preact/compat';
import { Box, Button } from '@chakra-ui/react';

import Layout from '@/layout';
import { ArtifactsList } from '@/components';

import { useArtifacts } from '@/context/artifacts';
import { Link } from 'react-router';

interface RecentArtifactsProps {
  limit?: number;
}

const RecentArtifacts: FC<RecentArtifactsProps> = ({ limit = 6 }) => {
  const { artifacts, isLoading, error } = useArtifacts();
  const [showError, setShowError] = useState(false);

  const recentArtifacts = artifacts?.slice(0, limit) || [];

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Layout heading="Recent:">
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

      {artifacts && <ArtifactsList artifacts={recentArtifacts} isLoading={isLoading} />}

      <Button asChild>
        <Link to="/artifacts">all artifacts</Link>
      </Button>
    </Layout>
  );
};

export default RecentArtifacts;
