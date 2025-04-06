import { Artifact } from '@/context/artifacts';
import { FC } from 'preact/compat';

interface SingleArtifactProps {
  artifact: Artifact;
}

const SingleArtifact: FC<SingleArtifactProps> = ({ artifact }) => {
  console.log('[SingleArtifact] ✅ Mounted', artifact);
  return <div>🧪 Single Artifact Page</div>;
};

export default SingleArtifact;
