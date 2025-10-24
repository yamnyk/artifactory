import { FC } from 'preact/compat';
import { Artifact } from '@/context/artifacts';
import { Badge, Grid, GridItem, Image, Text, VStack } from '@chakra-ui/react';

import { patchImagePaths } from '@/context/artifacts/helpers';
import { shortenText } from '@/utils';
import { Link, ROUTES } from '@/routing';

interface ArtifactCardProps {
  artifact: Artifact;
}

const ArtifactCard: FC<ArtifactCardProps> = ({ artifact }) => {
  const createdDate = new Date(artifact.created);

  return (
    <GridItem p={4} shadow="md" borderWidth="1px" borderRadius="lg" asChild>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem asChild>
          <Image
            height="250px"
            width="100%"
            src={patchImagePaths(artifact.id)}
            alt={artifact.title}
            objectFit="cover"
          />
        </GridItem>
        <GridItem>
          <VStack align="start" textAlign="left">
            <Link to={ROUTES.ARTIFACT.replace(':id', artifact.id)}>
              <Text fontWeight="bold" fontSize="lg">
                {artifact.title}
              </Text>
            </Link>
            {artifact.dedication && (
              <Text fontSize="sm" color="gray.500">
                to: {artifact.dedication}
              </Text>
            )}
            <Text fontSize="sm">
              {createdDate.getDate()}-{createdDate.getMonth() + 1}-{createdDate.getFullYear()}
            </Text>
            <Badge fontSize="sm">{artifact.type}</Badge>
            <Text fontSize="sm" title={artifact.description}>
              {shortenText(artifact.description, 10)}
            </Text>
          </VStack>
        </GridItem>
      </Grid>
    </GridItem>
  );
};

export default ArtifactCard;
