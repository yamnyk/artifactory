import { FC } from 'preact/compat';
import { Link as RouterLink } from '@/routing';
import { Flex, Link as ChakraLink } from '@chakra-ui/react';

import { ROUTES } from '@/routing/helper';

import { SearchBar } from '@/components';

const Header: FC = () => {
  return (
    <Flex as="header" bg="teal.500" color="white" p={4} justifyContent="space-between" alignItems="center">
      <ChakraLink fontWeight="bold" fontSize="lg" color="white" _hover={{ textDecoration: 'underline' }} asChild>
        <RouterLink to={ROUTES.HOME}>Artifactory</RouterLink>
      </ChakraLink>
      <Flex alignItems="center" gap={4}>
        <ChakraLink fontWeight="bold" fontSize="lg" color="white" _hover={{ textDecoration: 'underline' }} asChild>
          <RouterLink to={ROUTES.ARTIFACTS}>All</RouterLink>
        </ChakraLink>
        <SearchBar />
      </Flex>
    </Flex>
  );
};

export default Header;
