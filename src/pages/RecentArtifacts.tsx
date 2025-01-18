import { FC } from 'preact/compat';
import { Flex, Button, Heading } from '@chakra-ui/react';

import { useArtifacts, Artifact } from '@/context/artifacts';

import { ArtifactsList } from '@/components';

interface RecentArtifactsProps {
  limit?: number;
}

const RecentArtifacts: FC<RecentArtifactsProps> = ({ limit = 6 }) => {
  const { artifacts, isLoading } = useArtifacts();
  const recentArtifacts: Artifact[] = artifacts.slice(0, limit);

  return (
    <Flex p="2ch 0" direction="column" gap="2ch" align="center">
      <Heading>Recent:</Heading>
      <ArtifactsList artifacts={recentArtifacts} isLoading={isLoading} />
      <Button>all artifacts</Button>
    </Flex>
  );
};

export default RecentArtifacts;
