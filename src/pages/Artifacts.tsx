import { Heading } from '@chakra-ui/react';

import { ArtifactsList } from '@/components';

import { useArtifacts } from '@/context/artifacts';

const Artifacts = () => {
  const { artifacts, isLoading } = useArtifacts();

  return (
    <>
      <Heading>Artifacts</Heading>

      <ArtifactsList artifacts={artifacts} isLoading={isLoading} />
    </>
  );
};

export default Artifacts;
