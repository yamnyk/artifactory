import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { FunctionalComponent } from 'preact';
import { useCallback } from 'preact/hooks';

interface Props extends Omit<ChakraLinkProps, 'href'> {
  to: string;
  replace?: boolean;
}

const Link: FunctionalComponent<Props> = ({ to, replace = false, onClick, ...rest }) => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;

      e.preventDefault();
      if (replace) {
        window.history.replaceState({}, '', to);
      } else {
        window.history.pushState({}, '', to);
      }
      window.dispatchEvent(new PopStateEvent('popstate'));
    },
    [to, replace]
  );

  return (
    <ChakraLink
      href={to}
      onClick={(e: any) => {
        handleClick(e);
        onClick?.(e);
      }}
      {...rest}
    />
  );
};

export default Link;
