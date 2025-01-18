import { FC } from 'preact/compat';
import { Link as RouterLink } from 'react-router';
import { Flex, Link, Input } from '@chakra-ui/react';

const Header: FC = () => {
  return (
    <Flex as="header" bg="teal.500" color="white" p={4} justifyContent="space-between" alignItems="center">
      <Link
        as={RouterLink}
        href="/"
        fontWeight="bold"
        fontSize="lg"
        color="white"
        _hover={{ textDecoration: 'underline' }}
      >
        Artifactory
      </Link>
      <Flex alignItems="center" gap={4}>
        <Link href="#" color="white" _hover={{ textDecoration: 'underline' }}>
          List
        </Link>
        <Input placeholder="Search..." size="sm" bg="white" color="black" borderRadius="md" />
      </Flex>
    </Flex>
  );
};

export default Header;
