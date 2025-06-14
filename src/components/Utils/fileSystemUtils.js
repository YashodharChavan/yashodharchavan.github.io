import { fileSystem } from './fileSystem';

// Utility to get the node at a given path
const getNodeAtPath = (path) => {
  if (path === '/') return fileSystem['/'];

  const parts = path.split('/').filter((part) => part !== '');
  let currentNode = fileSystem['/'];

  for (const part of parts) {
    if (!currentNode || currentNode.type !== 'dir' || !currentNode.children[part]) {
      return null; // Path not found
    }
    currentNode = currentNode.children[part];
  }

  return currentNode;
};

export { getNodeAtPath };