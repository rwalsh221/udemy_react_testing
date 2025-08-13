// Import the Repository type and utility functions being tested
import { describe } from 'node:test';
import { Repository } from '../types';
import {
  calculateMostForkedRepos,
  calculateMostStarredRepos,
  calculatePopularLanguages,
} from '../utils';
import { expect } from 'vitest';

// Mock data representing a sample array of repository objects
// Each repository contains basic info like name, description, stars, forks,
// and a nested languages object with size information
export const mockRepositories: Repository[] = [
  {
    name: 'repo1',
    description: 'test repo 1',
    stargazerCount: 1000,
    forkCount: 500,
    url: 'https://github.com/test/repo1',
    languages: {
      edges: [
        { node: { name: 'javascript' }, size: 1000 },
        { node: { name: 'typescript' }, size: 500 },
      ],
    },
  },
  {
    name: 'repo2',
    description: 'test repo 2',
    stargazerCount: 2000,
    forkCount: 300,
    url: 'https://github.com/test/repo2',
    languages: {
      edges: [
        { node: { name: 'python' }, size: 800 },
        { node: { name: 'javascript' }, size: 400 },
      ],
    },
  },
  {
    name: 'repo3',
    description: 'test repo 3',
    stargazerCount: 3000,
    forkCount: 1000,
    url: 'https://github.com/test/repo3',
    languages: {
      edges: [
        { node: { name: 'typescript' }, size: 1200 },
        { node: { name: 'python' }, size: 300 },
      ],
    },
  },
];

describe('calculate most forked repos', () => {
  test('should return empty array for empty input', () => {
    const result = calculateMostForkedRepos([]);
    expect(result).toEqual([]);
  });

  test('should return top 5 most forked repos', () => {
    const result = calculateMostForkedRepos(mockRepositories);

    expect(result).toEqual([
      { repo: 'repo3', count: 1000 },
      { repo: 'repo1', count: 500 },
      { repo: 'repo2', count: 300 },
    ]);
  });

  test('should sort repositories by fork count in descending order', () => {
    const result = calculateMostForkedRepos(mockRepositories);

    expect(result[0].count).toBeGreaterThanOrEqual(result[1].count);
    expect(result[1].count).toBeGreaterThanOrEqual(result[2].count);
  });
});
