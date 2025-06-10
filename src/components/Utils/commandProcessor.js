// utils/commandProcessor.js

// Simulated File System
const fileSystem = {
    '/': {
        type: 'dir',
        children: {
            home: {
                type: 'dir',
                children: {
                    yashodhar: { type: 'dir', children: {} }
                }
            },
            etc: { type: 'dir', children: {} },
            'file.txt': { type: 'file', content: 'Hello World' }
        }
    }
};

let currentPath = ['/'];

function getCurrentDir() {
    let dir = fileSystem['/'];
    for (let i = 1; i < currentPath.length; i++) {
        dir = dir.children[currentPath[i]];
    }
    return dir;
}

function getPromptPath() {
    return currentPath.length === 1 ? '~' : currentPath.slice(1).join('/');
}

function printTree(node, prefix = '') {
    let output = '';
    const keys = Object.keys(node.children || {});
    const lastIndex = keys.length - 1;

    keys.forEach((key, index) => {
        const child = node.children[key];
        const isLast = index === lastIndex;
        const pointer = isLast ? '└── ' : '├── ';
        output += prefix + pointer + key + '\n';

        if (child.type === 'dir') {
            const childPrefix = prefix + (isLast ? '    ' : '│   ');
            output += printTree(child, childPrefix);
        }
    });

    return output;
}

function getSuggestions(command, partial) {
    if (!partial) return [];

    const dir = getCurrentDir();
    return Object.keys(dir.children).filter(name => name.startsWith(partial));
}

function runCommand(cmdLine) {

    if (typeof cmdLine !== 'string') {
        console.error('Invalid command:', cmdLine);
        return;  // or handle error gracefully
    }

    console.log(typeof cmdLine)
    const [command, ...args] = cmdLine.split(/\s+/);

    switch (command) {
        case 'pwd':
            return currentPath.join('/');

        case 'exit':
            return '__EXIT__'; // Special signal indicating the terminal should close


        case 'ls': {
            const dir = getCurrentDir();
            return Object.keys(dir.children).join('  ');
        }

        case 'cd': {
            const target = args[0];
            if (!target || target === '/') {
                currentPath = ['/'];
                return '';
            }
            if (target === '..') {
                if (currentPath.length > 1) currentPath.pop();
                return '';
            }
            const dir = getCurrentDir().children[target];
            if (dir && dir.type === 'dir') {
                currentPath.push(target);
                return '';
            }
            return `cd: no such directory: ${target}`;
        }

        case 'cat': {
            const fileName = args[0];
            if (!fileName) return 'cat: missing operand';
            const dir = getCurrentDir();
            const file = dir.children[fileName];
            if (!file) return `cat: ${fileName}: No such file or directory`;
            if (file.type !== 'file') return `cat: ${fileName}: Is a directory`;
            return file.content;
        }

        case 'write': {
            const fileName = args[0];
            if (!fileName) return 'write: missing filename';
            const content = args.slice(1).join(' ');
            if (!content) return 'write: missing content to write';
            const dir = getCurrentDir();
            dir.children[fileName] = { type: 'file', content };
            return '';
        }

        case 'append': {
            const fileName = args[0];
            if (!fileName) return 'append: missing filename';
            const content = args.slice(1).join(' ');
            if (!content) return 'append: missing content to append';
            const dir = getCurrentDir();
            if (!dir.children[fileName]) {
                dir.children[fileName] = { type: 'file', content };
            } else if (dir.children[fileName].type === 'file') {
                dir.children[fileName].content += content;
            } else {
                return `append: ${fileName} is a directory`;
            }
            return '';
        }

        case 'mkdir': {
            const name = args[0];
            if (!name) return 'mkdir: missing operand';
            const dir = getCurrentDir();
            if (dir.children[name]) return 'mkdir: directory already exists';
            dir.children[name] = { type: 'dir', children: {} };
            return '';
        }

        case 'echo':
            return args.join(' ');

        case 'touch': {
            const fileName = args[0];
            if (!fileName) return 'touch: missing operand';
            const dir = getCurrentDir();
            if (dir.children[fileName]) return 'touch: file already exists';
            if (!fileName.includes('.')) return 'touch: cannot create directories';
            dir.children[fileName] = { type: 'file', content: '' };
            return '';
        }

        case 'rm': {
            const fileName = args[0];
            if (!fileName) return 'rm: missing operand';
            const dir = getCurrentDir();
            if (!dir.children[fileName]) return `rm: cannot remove '${fileName}': No such file or directory`;
            if (dir.children[fileName].type === 'dir') return `${fileName} is a directory`;
            delete dir.children[fileName];
            return '';
        }

        case 'rmdir': {
            const dirName = args[0];
            if (!dirName) return 'rmdir: missing operand';
            const dir = getCurrentDir();
            const target = dir.children[dirName];
            if (!target) return `rmdir: failed to remove '${dirName}': No such file or directory`;
            if (target.type !== 'dir') return `rmdir: failed to remove '${dirName}': Not a directory`;
            if (Object.keys(target.children).length > 0) return `rmdir: failed to remove '${dirName}': Directory not empty`;
            delete dir.children[dirName];
            return '';
        }

        case 'clear':
            return '__CLEAR__'; // You can handle this as a special signal in your component

        case 'tree': {
            const dir = getCurrentDir();
            return '.\n' + printTree(dir);
        }

        case 'cp': {
            const [src, dest] = args;
            if (!src || !dest) return 'cp: missing file operand';
            const dir = getCurrentDir();
            const srcNode = dir.children[src];
            if (!srcNode) return `cp: cannot stat '${src}': No such file or directory`;
            if (srcNode.type !== 'file') return `cp: -r not specified; omitting directory '${src}'`;
            if (dir.children[dest]?.type === 'dir') {
                dir.children[dest].children[src] = { ...srcNode };
            } else {
                dir.children[dest] = { ...srcNode };
            }
            return '';
        }

        case 'mv': {
            const [src, dest] = args;
            if (!src || !dest) return 'mv: missing file operand';
            const dir = getCurrentDir();
            const srcNode = dir.children[src];
            if (!srcNode) return `mv: cannot stat '${src}': No such file or directory`;

            if (dir.children[dest]?.type === 'dir') {
                if (dir.children[dest].children[src]) {
                    return `mv: cannot move '${src}': destination '${dest}/${src}' already exists`;
                }
                dir.children[dest].children[src] = srcNode;
                delete dir.children[src];
            } else {
                dir.children[dest] = srcNode;
                delete dir.children[src];
            }
            return '';
        }

        default:
            return `Command not found: ${command}`;
    }
}



export { runCommand, getPromptPath, getSuggestions };
