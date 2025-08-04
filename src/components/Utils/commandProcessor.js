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
ls [pattern]        List directory contents (supports wildcards, e.g., *.txt)
cd <dir>            Change directory
cat <file>          Display file content
write <file> <text> Overwrite/create file with text
append <file> <text> Append text to a file
mkdir <dir>         Create a new directory
touch <file.ext>    Create a new empty file
rm <file>           Remove a file (supports wildcards)
rmdir [-f] <dir>    Remove a directory (supports wildcards; use -f to force non-empty)
cp <src> <dest>     Copy file to destination (supports wildcards)
mv <src> <dest>     Move/Rename file or move into directory (supports wildcards)
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
                const children = dir.children || {};

                const pattern = args[0]; // like *.txt or file*

                if (pattern && pattern.includes('*')) {
                    const regexPattern = '^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$';
                    const regex = new RegExp(regexPattern);

                    const matched = Object.keys(children).filter(name => regex.test(name));
                    // return matched.join('  ') || `ls: no matches found for '${pattern}'`;
                    return ''
                }

                // No wildcard → list everything
                return Object.keys(children).join('  ');
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
                const children = dir.children || {};

                // If fileName contains wildcard (*), treat as pattern
                if (fileName.includes('*')) {
                    // Convert wildcard pattern to regex
                    const regexPattern = '^' + fileName.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$';
                    const regex = new RegExp(regexPattern);

                    const matchingFiles = Object.keys(children).filter(
                        name => regex.test(name) && children[name].type !== 'dir' && children[name].type !== 'burn'
                    );

                    if (matchingFiles.length === 0) {
                        return `rm: cannot remove '${fileName}': No matching files`;
                    }

                    matchingFiles.forEach(name => delete children[name]);
                    updateFileSystem({ ...fileSystemRef });
                    return '';
                }

                // No wildcard, proceed as usual
                if (!children[fileName]) return `rm: cannot remove '${fileName}': No such file or directory`;
                if (children[fileName].type === 'dir' || children[fileName].type === 'burn') {
                    return `${fileName} is a directory`;
                }

                delete children[fileName];
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

                const pattern = filteredArgs[0];
                if (!pattern) return 'rmdir: missing operand';

                const dir = getCurrentDir();
                const children = dir.children || {};

                // Wildcard support
                const escapeRegex = s =>
                    s.replace(/[-[\]/{}()+?.\\^$|]/g, '\\$&').replace(/\*/g, '.*');
                const isWildcard = pattern.includes('*');
                const regex = isWildcard ? new RegExp('^' + escapeRegex(pattern) + '$') : null;

                const targets = Object.keys(children).filter(name => {
                    const node = children[name];
                    const match = isWildcard ? regex.test(name) : name === pattern;
                    return match && (node.type === 'dir' || node.type === 'burn');
                });

                if (targets.length === 0) {
                    return `rmdir: failed to remove '${pattern}': No matching directories`;
                }

                const errors = [];

                targets.forEach(name => {
                    const node = children[name];
                    const isEmpty = !node.children || Object.keys(node.children).length === 0;

                    if (isEmpty || force) {
                        delete dir.children[name];
                    } else {
                        errors.push(`rmdir: failed to remove '${name}': Directory not empty (use -f to force)`);
                    }
                });

                updateFileSystem({ ...fileSystemRef });

                return errors.join('\n') || '';
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
                const children = dir.children || {};

                // Handle wildcard pattern
                const isWildcard = src.includes('*');
                const regex = isWildcard
                    ? new RegExp('^' + src.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$')
                    : null;

                const matches = isWildcard
                    ? Object.entries(children).filter(([name, node]) => regex.test(name) && node.type === 'file')
                    : [[src, children[src]]];

                if (matches.length === 0 || matches.some(([_, node]) => !node)) {
                    return `cp: cannot stat '${src}': No such file or directory`;
                }

                // Check if destination is a folder
                const destNode = children[dest];
                const isDestFolder = destNode?.type === 'dir' || destNode?.type === 'burn';

                for (const [name, node] of matches) {
                    if (!node || node.type !== 'file') {
                        return `cp: -r not specified; omitting directory '${name}'`;
                    }

                    if (isDestFolder) {
                        destNode.children[name] = { ...node };
                    } else {
                        // If not wildcard, and dest is a file name, rename
                        const targetName = isWildcard ? name : dest;
                        children[targetName] = { ...node };
                    }
                }

                updateFileSystem({ ...fileSystemRef });
                return '';
            }


            case 'mv': {
                const [srcPattern, dest] = args;
                if (!srcPattern || !dest) return 'mv: missing file operand';

                const dir = getCurrentDir();
                const children = dir.children || {};

                const escapeRegex = s =>
                    s.replace(/[-[\]/{}()+?.\\^$|]/g, '\\$&').replace(/\*/g, '.*');

                const isWildcard = srcPattern.includes('*');
                const regex = isWildcard ? new RegExp('^' + escapeRegex(srcPattern) + '$') : null;

                const matchedFiles = isWildcard
                    ? Object.keys(children).filter(name => regex.test(name))
                    : [srcPattern];

                if (matchedFiles.length === 0) {
                    return `mv: cannot stat '${srcPattern}': No such file or directory`;
                }

                const destNode = children[dest];
                const isDestDir = destNode && (destNode.type === 'dir' || destNode.type === 'burn');
                const errors = [];

                matchedFiles.forEach(name => {
                    const fileNode = children[name];
                    if (!fileNode) {
                        errors.push(`mv: cannot stat '${name}': No such file or directory`);
                        return;
                    }

                    if (isDestDir) {
                        if (destNode.children[name]) {
                            errors.push(`mv: cannot move '${name}': destination '${dest}/${name}' already exists`);
                            return;
                        }
                        destNode.children[name] = fileNode;
                    } else {
                        // If only one match and dest is not a dir, treat as rename
                        if (matchedFiles.length === 1) {
                            children[dest] = fileNode;
                        } else {
                            errors.push(`mv: target '${dest}' is not a directory`);
                            return;
                        }
                    }

                    delete children[name];
                });

                updateFileSystem({ ...fileSystemRef });

                return errors.join('\n') || '';
            }


            default:
                return `Command not found: ${command}`;
        }
    }

    return { runCommand, getPromptPath, getSuggestions };
}

export { createCommandProcessor };