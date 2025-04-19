import { createContext } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import { FC, PropsWithChildren } from 'preact/compat';

import { fetchArtifacts } from './helpers';

export interface Artifact {
  id: string;
  author: string;
  title: string;
  type: null | string;
  created: Date;
  description: string;
  dedication: null | string;
  photo?: string;
}

export interface ArtifactsContextProps {
  artifacts: Artifact[];
  isLoading: boolean;
  error: Error | null;
}

const ArtifactsContext = createContext<ArtifactsContextProps | undefined>(undefined);

export const ArtifactsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchArtifacts({
      setArtifacts,
      setError,
      setIsLoading,
    })();
  }, []);

  return <ArtifactsContext.Provider value={{ artifacts, isLoading, error }}>{children}</ArtifactsContext.Provider>;
};

export const useArtifacts = () => {
  const context = useContext(ArtifactsContext);
  if (!context) {
    throw new Error('useArtifacts must be used within an ArtifactsProvider');
  }
  return context;
};
