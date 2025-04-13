import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { FunctionalComponent, JSX } from 'preact';
import { useCallback } from 'preact/hooks';
import { navigate } from './helper';

interface Props extends Omit<ChakraLinkProps, 'href'> {
  to: string;
  replace?: boolean;
}

const Link: FunctionalComponent<Props> = ({ to, replace = false, onClick, ...rest }) => {
  const handleClick = useCallback(
    (e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;

      e.preventDefault();
      navigate(to); // helper handles base + push
      onClick?.(e);
    },
    [to, onClick]
  );

  return <ChakraLink href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${to}`} onClick={handleClick} {...rest} />;
};

export default Link;
