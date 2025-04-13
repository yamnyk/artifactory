import { FC } from 'preact/compat';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface SingleArtifactProps {
  artifactMarkdown: string;
}

const SingleArtifact: FC<SingleArtifactProps> = ({ artifactMarkdown }) => {
  return <Markdown rehypePlugins={[rehypeRaw]}>{artifactMarkdown}</Markdown>;
};

export default SingleArtifact;
