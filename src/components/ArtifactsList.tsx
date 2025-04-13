import { FC } from 'preact/compat';
import { HStack, Stack, Grid } from '@chakra-ui/react';

import { Artifact } from '@/context/artifacts';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton.tsx';

import ArtifactCard from './ArtifactCard';

type ArtifactsListProps = {
  artifacts: Artifact[];
  isLoading: boolean;
};

const ArtifactsList: FC<ArtifactsListProps> = ({ artifacts, isLoading }) => {
  return (
    <Grid templateColumns="1fr 1fr 1fr" gap="2ch">
      {isLoading ? (
        <Stack gap="6" maxW="lg">
          <Skeleton height="200px" />
          <HStack width="full">
            <SkeletonText noOfLines={2} />
          </HStack>
        </Stack>
      ) : (
        artifacts.map((artifact, index) => {
          return <ArtifactCard key={`${index}-${artifact.title}-${artifact.type}`} artifact={artifact} />;
        })
      )}
    </Grid>
  );
};

export default ArtifactsList;
