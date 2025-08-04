import quotesy from 'quotesy';
import * as cowsay from "cowsay";

function createCommandProcessor(fileSystemRef, updateFileSystem, currentPath, updateCurrentPath) {
    function generateMonthCalendar(month, year) {
        const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let output = `     ${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}\n`;
        output += days.join(' ') + '\n';

        let line = '   '.repeat(firstDay);
        for (let i = 1; i <= daysInMonth; i++) {
            line += i.toString().padStart(2, ' ') + ' ';
            if ((firstDay + i) % 7 === 0 || i === daysInMonth) {
                output += line.trimEnd() + '\n';
                line = '';
            }
        }

        return output.trimEnd();
    }

    function generateYearCalendar2x6(year) {
        const monthLines = [];

        // Generate each month's calendar as an array of lines
        for (let month = 0; month < 12; month++) {
            monthLines.push(generateMonthCalendar(month, year).split('\n'));
        }

        // Prepare the output in 2x6 grid
        let output = '';
        for (let row = 0; row < 6; row++) {
            const left = monthLines[row];
            const right = monthLines[row + 6];

            const maxLines = Math.max(left.length, right.length);

            for (let line = 0; line < maxLines; line++) {
                const leftLine = left[line] || '';
                const rightLine = right[line] || '';
                const paddedLeft = leftLine.padEnd(20, ' ');
                output += paddedLeft + '  ' + rightLine + '\n';
            }

            output += '\n';
        }

        return output.trim();
    }


    function generateYearCalendar(year) {
        let output = `                                 ${year}\n`;
        for (let quarter = 0; quarter < 12; quarter += 3) {
            const quarters = [0, 1, 2].map(i => generateMonthLines(quarter + i, year));
            for (let i = 0; i < quarters[0].length; i++) {
                output += quarters.map(month => month[i] || ' '.repeat(20)).join('   ') + '\n';
            }
            output += '\n';
        }
        return output.trimEnd();
    }

    function generateMonthLines(month, year) {
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
        const header = monthName.padStart(Math.floor((20 + monthName.length) / 2), ' ');
        const days = 'Su Mo Tu We Th Fr Sa';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let lines = [header, days];
        let line = '   '.repeat(firstDay);
        for (let i = 1; i <= daysInMonth; i++) {
            line += i.toString().padStart(2, ' ') + ' ';
            if ((firstDay + i) % 7 === 0 || i === daysInMonth) {
                lines.push(line.trimEnd());
                line = '';
            }
        }
        return lines;
    }

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

            case 'date': {
                const now = new Date();

                // Format: Mon Aug 04 2025 14:32:00
                const formatted = now.toDateString() + ' ' + now.toLocaleTimeString();
                return formatted;
            }
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
date                Show current system date and time
clear               Clear terminal
exit                Exit terminal

Type "man" to show this help message.`;
            }

            case 'exit':
                return '__EXIT__';

            case 'fortune': {
                const { text, author } = quotesy.random();
                return `"${text}" \n- ${author}`;
            }
            case 'cowsay': {
                const message = args.join(" ");
                if (!message) return "Usage: cowsay [message]";
                return cowsay.say({ text: message });
            }
            
            case 'cal': {
                const now = new Date();
                let month = now.getMonth();
                let year = now.getFullYear();

                if (args.length === 1 && args[0] === '-y') {
                    return generateYearCalendar2x6(year);
                }

                if (args.length === 1) {
                    const parsedYear = parseInt(args[0]);
                    if (!isNaN(parsedYear)) {
                        return generateYearCalendar2x6(parsedYear);
                    }
                }

                if (args.length === 2) {
                    const parsedMonth = parseInt(args[0]);
                    const parsedYear = parseInt(args[1]);
                    if (!isNaN(parsedMonth) && !isNaN(parsedYear)) {
                        month = parsedMonth - 1;
                        year = parsedYear;
                    }
                }

                return generateMonthCalendar(month, year);
            }





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