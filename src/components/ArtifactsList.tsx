import { FC } from 'preact/compat';
import { Text, VStack, Image, HStack, Stack, Grid, GridItem } from '@chakra-ui/react';

import { Artifact } from '@/context/artifacts';
import { Skeleton, SkeletonText } from '@/components/ui/skeleton.tsx';

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
          const createdDate = new Date(artifact.created);
          return (
            <GridItem
              key={`${index}-${artifact.title}-${artifact.type}`}
              p={4}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
            >
              <Image boxSize="100px" src={artifact.photo} alt={artifact.title} />
              <VStack align="start" textAlign="left">
                <Text fontWeight="bold" fontSize="lg">
                  {artifact.title}
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Type: {artifact.type}
                </Text>
                <Text fontSize="sm">
                  Created: {createdDate.getDate()}-{createdDate.getMonth() + 1}-{createdDate.getFullYear()}
                </Text>
                <Text fontSize="sm">{artifact.description}</Text>
              </VStack>
            </GridItem>
          );
        })
      )}
    </Grid>
  );
};

export default ArtifactsList;
