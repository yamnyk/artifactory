import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box as="footer" textAlign="center" py="4" bg="gray.800" color="white">
      <Text fontSize="sm">Artfactiry &copy; since 2025</Text>
    </Box>
  );
};

export default Footer;