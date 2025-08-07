import { rootFileOptions, applicationIcons } from './fileSystem';
import genericFolder from '../../assets/folders/GenericFolderIcon.avif';


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


const getIconForItem = (name, type) => {
  if (type === 'burn') {
    return rootFileOptions.find(opt => opt.label === 'burn')?.icon;
  }

  if (type === 'dir') {
    const nameLower = name.toLowerCase();
    if (nameLower === 'burn') return genericFolder;
    const match = rootFileOptions.find(opt => opt.label.toLowerCase() === nameLower);
    return match ? match.icon : genericFolder;
  }

  const ext = name.includes('.') ? `.${name.split('.').pop()}` : '';
  const iconMap = {
    '.md': '.md', '.pdf': '.pdf', '.bin': '.bin',
    '.zip': '.zip', '.html': '.html', '.avif': '.avif',
    '.css': '.css', '.js': '.js', '.jsx': '.jsx',
  };

  if (iconMap[ext]) {
    return rootFileOptions.find(opt => opt.label === iconMap[ext])?.icon;
  }
  if (ext === '.app') {
    return applicationIcons.find(opt => opt.label === name)?.icon;
  }
  return rootFileOptions.find(opt => opt.label === type || opt.label === '.txt')?.icon;
};

export { getNodeAtPath, getIconForItem };