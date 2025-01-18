import { FC } from 'preact/compat';
import { Artifact } from '@/context/artifacts';
import { GridItem, Image, Text, VStack } from '@chakra-ui/react';

interface ArtifactCardProps {
  artifact: Artifact;
}

const ArtifactCard: FC<ArtifactCardProps> = ({ artifact }) => {
  const createdDate = new Date(artifact.created);
  return (
    <GridItem key={artifact.id} p={4} shadow="md" borderWidth="1px" borderRadius="lg">
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
};

export default ArtifactCard;
