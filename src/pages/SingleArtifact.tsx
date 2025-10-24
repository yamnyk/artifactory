import { FC } from 'preact/compat';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Box } from '@chakra-ui/react';

import { chakraMarkdownComponents } from '@/utils';

interface SingleArtifactProps {
  artifactMarkdown: string;
}

const SingleArtifact: FC<SingleArtifactProps> = ({ artifactMarkdown }) => {
  return (
    <Box>
      <Markdown components={chakraMarkdownComponents} rehypePlugins={[rehypeRaw]}>
        {artifactMarkdown}
      </Markdown>
    </Box>
  );
};

export default SingleArtifact;
