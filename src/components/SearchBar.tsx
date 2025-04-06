import { useState, useEffect } from 'preact/hooks';
import { Input, Box, List, ListItem, Link as ChakraLink } from '@chakra-ui/react';

import { Link } from '@/routing';
import { ROUTES } from '@/routing/helper';
import { Artifact, useArtifacts } from '@/context/artifacts';

const SearchBar = () => {
  const { artifacts } = useArtifacts();
  const [query, setQuery] = useState<string | null>(null);
  const [filteredArtifacts, setFilteredArtifacts] = useState<Artifact[] | null>(null);

  useEffect(() => {
    if (query) {
      const filteredArtifacts = artifacts?.filter((artifact) =>
        artifact.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArtifacts(filteredArtifacts);
    }
  }, [query]);

  return (
    <Box width="16ch" position="relative">
      <Input
        placeholder="Search..."
        width={32}
        size="sm"
        bg="white"
        color="black"
        borderRadius="md"
        onKeyUp={(e) => {
          const searchInput = e.target as HTMLInputElement | null;
          setQuery(searchInput?.value || null);
        }}
        onBlur={() => {
          setTimeout(() => {
            setQuery(null);
            setFilteredArtifacts(null);
          }, 200);
        }}
        value={query || ''}
      />

      {query && filteredArtifacts && (
        <List.Root
          position={'absolute'}
          right={0}
          width="24ch"
          height={200}
          overflowY="auto"
          bg="white"
          borderRadius="md"
          boxShadow="md"
          listStyle={'none'}
          zIndex={1}
        >
          {filteredArtifacts?.length === 0 && <ListItem p={2}>No results found</ListItem>}
          {filteredArtifacts?.map((artifact, index) => (
            <ListItem key={index} p={2} _hover={{ bg: 'gray.100', cursor: 'pointer' }}>
              <ChakraLink asChild color="black" _hover={{ color: 'blue', cursor: 'pointer' }} fontSize={'sm'}>
                <Link to={`${ROUTES.ARTIFACTS}/${artifact.id}`}>{artifact.title}</Link>
              </ChakraLink>
            </ListItem>
          ))}
        </List.Root>
      )}
    </Box>
  );
};

export default SearchBar;
