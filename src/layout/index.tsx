import { FC } from 'preact/compat';
import { Heading, Flex } from '@chakra-ui/react';

import Header from './Header';
import Footer from './Footer';

const Layout: FC<{ children: React.ReactNode; heading?: string }> = ({ children, heading }) => {
  return (
    <>
      <Header />
      <Flex asChild p="2ch 0" direction="column" gap="2ch" align="center">
        <main>
          <Heading>{heading}</Heading>
          {children}
        </main>
      </Flex>
      <Footer />
    </>
  );
};

export default Layout;
