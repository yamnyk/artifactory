import React from 'react';
import { Flex, Box, Link, Input } from '@chakra-ui/react';

const Header: React.FC = () => {
    return (
        <Flex as="header" bg="teal.500" color="white" p={4} justifyContent="space-between" alignItems="center">
            <Box fontWeight="bold" fontSize="lg">Artifactory</Box>
            <Flex alignItems="center" gap={4}>
                <Link href="#" color="white" _hover={{ textDecoration: 'underline' }}>List</Link>
                <Input placeholder="Search..." size="sm" bg="white" color="black" borderRadius="md" />
            </Flex>
        </Flex>
    );
};

export default Header;