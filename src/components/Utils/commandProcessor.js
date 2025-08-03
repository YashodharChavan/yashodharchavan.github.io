function createCommandProcessor(fileSystemRef, updateFileSystem, currentPath, updateCurrentPath) {

    function getCurrentDir() {
        let dir = fileSystemRef['/'];
        for (let i = 1; i < currentPath.length; i++) {
            dir = dir.children[currentPath[i]];
        }
        return dir;
    }

    function getPromptPath() {
        if (currentPath.join('/') === '/Users/yashodhar') return '~';
        return currentPath.slice(1).join('/');
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

            if (child.type === 'dir' || child.type === 'burn') {
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

    function resolvePath(target) {
        if (!target || target === '~') {
            return ['/', 'Users', 'yashodhar'];
        }

        const parts = target.startsWith('/')
            ? ['/', ...target.split('/').filter(p => p !== '')]
            : [...currentPath, ...target.split('/').filter(p => p !== '')];

        const newPath = [];
        let dir = fileSystemRef['/'];

        for (const part of parts) {
            if (part === '/' || part === '') {
                newPath.length = 0;
                newPath.push('/');
                dir = fileSystemRef['/'];
            } else if (part === '.') {
                continue;
            } else if (part === '..') {
                if (newPath.length > 1) {
                    newPath.pop();
                    dir = fileSystemRef['/'];
                    for (let i = 1; i < newPath.length; i++) {
                        if (!dir.children[newPath[i]]) {
                            return null;
                        }
                        dir = dir.children[newPath[i]];
                    }
                }
            } else {
                if (!dir.children[part] || (dir.children[part].type !== 'dir' && dir.children[part].type !== 'burn')) {
                    return null;
                }
                newPath.push(part);
                dir = dir.children[part];
            }
        }

        return newPath;
    }

    function runCommand(cmdLine) {
        if (typeof cmdLine !== 'string') {
            console.error('Invalid command:', cmdLine);
            return;
        }

        const [command, ...args] = cmdLine.split(/\s+/);

        switch (command) {
            case 'pwd':
                return currentPath.join('/');
            case 'man': {
                return `Available Commands:

pwd                 Print current working directory
ls                  List directory contents
cd <dir>            Change directory
cat <file>          Display file content
write <file> <text> Overwrite/create file with text
append <file> <text> Append text to a file
mkdir <dir>         Create a new directory
touch <file.ext>    Create a new empty file
rm <file>           Remove a file
rmdir [-f] <dir>    Remove an empty directory
cp <src> <dest>     Copy file to destination
mv <src> <dest>     Move/Rename file or move into directory
echo <text>         Print text to output
tree                Show folder structure
clear               Clear terminal
exit                Exit terminal

Type "man" to show this help message.`;
            }
            case 'exit':
                return '__EXIT__';

            case 'ls': {
                const dir = getCurrentDir();
                return Object.keys(dir.children).join('  ');
            }

            case 'cd': {
                const target = args[0];
                const newPath = resolvePath(target);
                if (newPath) {
                    updateCurrentPath(newPath);
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
                dir.children[fileName] = { type: 'file', content: content };
                updateFileSystem({ ...fileSystemRef });
                console.log(dir.children[fileName])
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
                updateFileSystem({ ...fileSystemRef });
                return '';
            }

            case 'mkdir': {
                const name = args[0];
                if (!name) return 'mkdir: missing operand';
                const dir = getCurrentDir();
                if (dir.children[name]) return 'mkdir: directory already exists';
                dir.children[name] = { type: 'dir', children: {} };
                updateFileSystem({ ...fileSystemRef });
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
                updateFileSystem({ ...fileSystemRef });
                return '';
            }

            case 'rm': {
                const fileName = args[0];
                if (!fileName) return 'rm: missing operand';
                const dir = getCurrentDir();
                if (!dir.children[fileName]) return `rm: cannot remove '${fileName}': No such file or directory`;
                if (dir.children[fileName].type === 'dir' || dir.children[fileName].type === 'burn') return `${fileName} is a directory`;
                delete dir.children[fileName];
                updateFileSystem({ ...fileSystemRef });
                return '';
            }

            case 'rmdir': {
                let force = false;
                const filteredArgs = args.filter(arg => {
                    if (arg === '-f') {
                        force = true;
                        return false;
                    }
                    return true;
                });

                const dirName = filteredArgs[0];
                if (!dirName) return 'rmdir: missing operand';

                const dir = getCurrentDir();
                const target = dir.children[dirName];

                if (!target) return `rmdir: failed to remove '${dirName}': No such file or directory`;
                if (target.type !== 'dir' && target.type !== 'burn')
                    return `rmdir: failed to remove '${dirName}': Not a directory`;

                const isEmpty = !target.children || Object.keys(target.children).length === 0;
                if (!isEmpty && !force)
                    return `rmdir: failed to remove '${dirName}': Directory not empty use -f to force`;

                delete dir.children[dirName];
                updateFileSystem({ ...fileSystemRef });

                return '';
            }



            case 'clear':
                return '__CLEAR__';

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
                if (dir.children[dest]?.type === 'dir' || dir.children[dest]?.type === 'burn') {
                    dir.children[dest].children[src] = { ...srcNode };
                } else {
                    dir.children[dest] = { ...srcNode };
                }
                updateFileSystem({ ...fileSystemRef });
                return '';
            }

            case 'mv': {
                const [src, dest] = args;
                if (!src || !dest) return 'mv: missing file operand';
                const dir = getCurrentDir();
                const srcNode = dir.children[src];
                if (!srcNode) return `mv: cannot stat '${src}': No such file or directory`;

                if (dir.children[dest]?.type === 'dir' || dir.children[dest]?.type === 'burn') {
                    if (dir.children[dest].children[src]) {
                        return `mv: cannot move '${src}': destination '${dest}/${src}' already exists`;
                    }
                    dir.children[dest].children[src] = srcNode;
                    delete dir.children[src];
                } else {
                    dir.children[dest] = srcNode;
                    delete dir.children[src];
                }
                updateFileSystem({ ...fileSystemRef });
                return '';
            }

            default:
                return `Command not found: ${command}`;
        }
    }

    return { runCommand, getPromptPath, getSuggestions };
}

export { createCommandProcessor };