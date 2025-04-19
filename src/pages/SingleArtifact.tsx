import { FC } from 'preact/compat';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Box } from '@chakra-ui/react';

import { chakraMarkdownHeadings } from '@/utils';

interface SingleArtifactProps {
  artifactMarkdown: string;
}

const SingleArtifact: FC<SingleArtifactProps> = ({ artifactMarkdown }) => {
  return (
    <Box className="clearfix">
      <Markdown components={chakraMarkdownHeadings} rehypePlugins={[rehypeRaw]}>
        {artifactMarkdown}
      </Markdown>
    </Box>
  );
};

export default SingleArtifact;
