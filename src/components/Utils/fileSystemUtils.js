const getNodeAtPath = (path, fileSystem) => {
  if (path === '/') return fileSystem['/'];

  const parts = path.split('/').filter((part) => part !== '');
  let currentNode = fileSystem['/'];

  for (const part of parts) {
    if (!currentNode || currentNode.type !== 'dir' || !currentNode.children[part]) {
      return null;
    }
    currentNode = currentNode.children[part];
  }

  return currentNode;
};

export { getNodeAtPath };