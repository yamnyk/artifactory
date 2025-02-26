import { StateUpdater, Dispatch } from 'preact/hooks';

import { Artifact } from './index';

export const sortByDate = (a1: Artifact, a2: Artifact) => {
  const a1Time = new Date(a1.created).getTime();
  const a2Time = new Date(a2.created).getTime();

  if (a1Time > Date.now() || a2Time > Date.now())
    throw new TypeError('Invalid Date: you can not create thigs from the furure!');

  return a2Time - a1Time;
};

export const fetchDetails = async (folderName: string) => {
  const artifactResponse = await fetch(`/artifacts/${folderName}/index.json`);
  if (!artifactResponse.ok) throw new Error(`Failed to fetch artifact: ${folderName}`);
  const artifact = await artifactResponse.json();
  artifact.photo = `/artifacts/${folderName}/pic.jpeg`;

  return artifact;
};

interface FetchArtifactsProps {
  setArtifacts: Dispatch<StateUpdater<Artifact[]>>;
  setError: Dispatch<StateUpdater<any>>;
  setIsLoading: Dispatch<StateUpdater<boolean>>;
}

export const fetchArtifacts =
  ({ setArtifacts, setError, setIsLoading }: FetchArtifactsProps) =>
  async () => {
    try {
      const response = await fetch(`/artifacts/index.json`);
      if (!response.ok) throw new Error('Failed to fetch artifacts index');

      const artifactNames: string[] = await response.json();
      const artifactsData = await Promise.all(artifactNames.map(fetchDetails));

      setArtifacts(artifactsData.sort(sortByDate));
    } catch (err: any) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
