import { Heading } from '@chakra-ui/react';

import Layout from '@/layout';
import { ArtifactsList } from '@/components';

import { useArtifacts } from '@/context/artifacts';

const Artifacts = () => {
  const { artifacts, isLoading } = useArtifacts();
  return (
    <Layout>
      <Heading>Artifacts</Heading>

      <ArtifactsList artifacts={artifacts} isLoading={isLoading} />
    </Layout>
  );
};

export default Artifacts;
