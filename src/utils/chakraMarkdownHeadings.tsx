import { JSX } from 'preact';
import { Text } from '@chakra-ui/react';
import { ComponentProps } from 'preact/compat';

type TextProps = ComponentProps<typeof Text>;

const heading =
  (tag: keyof JSX.IntrinsicElements, size: TextProps['fontSize'], align: TextProps['textAlign'] = 'left') =>
  (props: any) => <Text as={tag} fontSize={size} fontWeight="bold" mb="4" textAlign={align} {...props} />;

const chakraMarkdownComponents = {
  p: (props: any) => <Text as="p" mb="2" textAlign="left" {...props} />,
  h1: heading('h1', '2xl'), // ← only this one centered
  h2: heading('h2', 'xl'),
  h3: heading('h3', 'lg'),
  h4: heading('h4', 'md'),
  h5: heading('h5', 'sm'),
  h6: heading('h6', 'xs'),
};

export default chakraMarkdownComponents;
