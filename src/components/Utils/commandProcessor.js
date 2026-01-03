import quotesy from 'quotesy';
import * as cowsay from "cowsay";


function createCommandProcessor(fileSystemRef, updateFileSystem, currentPath, updateCurrentPath) {
    const normalizeName = (name) => name.replace(/\/+$/, "");

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
        const fullPath = currentPath.slice(1).join('/');

        if (fullPath === 'Users/yashodhar') {
            return '~';
        }

        if (fullPath.startsWith('Users/yashodhar/')) {
            return '~' + fullPath.substring('Users/yashodhar'.length);
        }

        return currentPath[currentPath.length - 1] || '/';
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

        const parts = partial.split('/');
        const lastPart = parts.pop();       // the part being typed
        const pathPart = parts.join('/');   // folders before it

        // Resolve base directory
        let baseDir;
        if (pathPart === '' || pathPart === '.') {
            baseDir = getCurrentDir();
        } else {
            const resolvedPath = resolvePath(pathPart);
            if (!resolvedPath) return [];
            baseDir = fileSystemRef['/'];
            for (let i = 1; i < resolvedPath.length; i++) {
                baseDir = baseDir.children[resolvedPath[i]];
            }
        }

        const children = baseDir.children || {};

        return Object.keys(children)
            .filter(name => name.startsWith(lastPart))
            .map(name => ({
                name,
                isDir: children[name].type === "dir" || children[name].type === "burn",
                prefix: pathPart // Used later to reconstruct full path!
            }));
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
                return '/' + currentPath.slice(1).join('/');


            case 'whoami':
                return 'yashodhar';

            case 'head': {
                let numLines = 10; // Default number of lines
                let pattern;
                let argIndex = 0;

                // Check for -n option
                if (args[0] === '-n' && args.length >= 2) {
                    const parsedNum = parseInt(args[1]);
                    if (isNaN(parsedNum) || parsedNum < 0) {
                        return 'head: invalid number of lines: ' + args[1];
                    }
                    numLines = parsedNum;
                    argIndex = 2;
                }
                pattern = args[argIndex];

                if (!pattern) return 'head: missing operand';

                const dir = getCurrentDir();
                const children = dir.children || {};

                // Handle wildcard pattern
                const isWildcard = pattern.includes('*');
                const regex = isWildcard
                    ? new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$')
                    : null;

                const matchedFiles = isWildcard
                    ? Object.keys(children).filter(name => regex.test(name) && children[name].type === 'file')
                    : [pattern];

                if (matchedFiles.length === 0) {
                    return `head: cannot open '${pattern}' for reading: No such file or directory`;
                }

                let output = '';
                matchedFiles.forEach((fileName, index) => {
                    const file = children[fileName];
                    if (!file) {
                        output += `head: cannot open '${fileName}' for reading: No such file or directory\n`;
                        return;
                    }
                    if (file.type !== 'file') {
                        output += `head: ${fileName}: Is a directory\n`;
                        return;
                    }

                    // Add filename header if multiple files match
                    if (matchedFiles.length > 1) {
                        output += `${index > 0 ? '\n' : ''}==> ${fileName} <==\n`;
                    }

                    // Split content into lines and take first N (or fewer)
                    const lines = (file.content || '').split('\n');
                    const headLines = lines.slice(0, numLines).join('\n');
                    output += headLines + (lines.length > 0 ? '\n' : '');
                });

                return output.trimEnd();
            }

            case 'tail': {
                let numLines = 10; // Default number of lines
                let pattern;
                let argIndex = 0;

                // Check for -n option
                if (args[0] === '-n' && args.length >= 2) {
                    const parsedNum = parseInt(args[1]);
                    if (isNaN(parsedNum) || parsedNum < 0) {
                        return 'tail: invalid number of lines: ' + args[1];
                    }
                    numLines = parsedNum;
                    argIndex = 2;
                }
                pattern = args[argIndex];

                if (!pattern) return 'tail: missing operand';

                const dir = getCurrentDir();
                const children = dir.children || {};

                // Handle wildcard pattern
                const isWildcard = pattern.includes('*');
                const regex = isWildcard
                    ? new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$')
                    : null;

                const matchedFiles = isWildcard
                    ? Object.keys(children).filter(name => regex.test(name) && children[name].type === 'file')
                    : [pattern];

                if (matchedFiles.length === 0) {
                    return `tail: cannot open '${pattern}' for reading: No such file or directory`;
                }

                let output = '';
                matchedFiles.forEach((fileName, index) => {
                    const file = children[fileName];
                    if (!file) {
                        output += `tail: cannot open '${fileName}' for reading: No such file or directory\n`;
                        return;
                    }
                    if (file.type !== 'file') {
                        output += `tail: ${fileName}: Is a directory\n`;
                        return;
                    }

                    // Add filename header if multiple files match
                    if (matchedFiles.length > 1) {
                        output += `${index > 0 ? '\n' : ''}==> ${fileName} <==\n`;
                    }

                    // Split content into lines, filter out trailing empty lines
                    const lines = (file.content || '').split('\n').filter(line => line !== '');
                    const tailLines = lines.slice(-numLines).join('\n');
                    output += tailLines + (lines.length > 0 ? '\n' : '');
                });

                return output.trimEnd();
            }


            case 'wc': {
                const pattern = args[0];
                if (!pattern) return 'wc: missing operand';

                const dir = getCurrentDir();
                const children = dir.children || {};

                // Handle wildcard pattern
                const isWildcard = pattern.includes('*');
                const regex = isWildcard
                    ? new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$')
                    : null;

                const matchedFiles = isWildcard
                    ? Object.keys(children).filter(name => regex.test(name) && children[name].type === 'file')
                    : [pattern];

                if (matchedFiles.length === 0) {
                    return `wc: ${pattern}: No such file or directory`;
                }

                let output = '';
                let totalLines = 0, totalWords = 0, totalChars = 0;

                matchedFiles.forEach((fileName, index) => {
                    const file = children[fileName];
                    if (!file) {
                        output += `wc: ${fileName}: No such file or directory\n`;
                        return;
                    }
                    if (file.type !== 'file') {
                        output += `wc: ${fileName}: Is a directory\n`;
                        return;
                    }

                    // Add filename header if multiple files match
                    if (matchedFiles.length > 1) {
                        output += `${index > 0 ? '\n' : ''}==> ${fileName} <==\n`;
                    }

                    // Calculate counts
                    const content = file.content || '';
                    const lines = content.split('\n').filter(line => line !== '').length;
                    const words = content.split(/\s+/).filter(word => word !== '').length;
                    const chars = content.length;
                    output += `${lines.toString().padStart(8)} ${words.toString().padStart(8)} ${chars.toString().padStart(8)} ${fileName}\n`;

                    // Accumulate totals
                    totalLines += lines;
                    totalWords += words;
                    totalChars += chars;
                });

                // Add total if multiple files
                if (matchedFiles.length > 1) {
                    output += `${totalLines.toString().padStart(8)} ${totalWords.toString().padStart(8)} ${totalChars.toString().padStart(8)} total\n`;
                }

                return output.trimEnd();
            }

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
nano <file>         Open file in nano editor (create if not exists)
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
fortune             Random quote
cowsay <msg>        ASCII cow message
cal [-y | m y]      Show calendar
head [-n num] <file> First 10/num lines (wildcards)
tail [-n num] <file> Last 10/num lines (wildcards)
wc <file>           Line/word/char count (wildcards)
man                 Show this help
clear               Clear terminal
exit                Exit terminal`
            }


            case 'exit':
                return '__EXIT__';

            case 'fortune': {
                const { text, author } = quotesy.random();
                return `"${text}" \n - ${author} `;
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
                const names = Object.keys(children).sort();

                const pattern = args[0];

                // If no pattern → list everything
                if (!pattern) {
                    return names.join('  ');
                }

                // Wildcard support: *.txt, f*, data??.log
                if (pattern.includes('*')) {

                    // Convert wildcard to regex: "*.txt" → /^.*\.txt$/ 
                    const regexPattern = '^' + pattern
                        .replace(/\./g, '\\.')
                        .replace(/\*/g, '.*') + '$';

                    const regex = new RegExp(regexPattern);

                    const matched = names.filter(name => regex.test(name));

                    if (matched.length === 0) {
                        return ``;
                    }

                    return matched.join('  ');
                }

                // No wildcard → literal lookup
                return children[pattern] ? pattern : `ls: cannot access '${pattern}': No such file or directory`;
            }



            case 'cd': {
                let target = args[0] || '~';  // default to home, not empty

                // Only normalize (remove trailing /) if it's not the root path
                if (target !== '/' && target !== '') {
                    target = normalizeName(target);
                }

                const newPath = resolvePath(target);
                if (newPath) {
                    updateCurrentPath(newPath);
                    return null;
                }
                return `cd: no such directory: ${args[0] || '~'}`;
            }

            case 'cat': {
                let fileName = args[0];
                if (!fileName) return 'cat: missing operand';

                fileName = normalizeName(fileName);

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
                return null;
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
                return null;
            }

            case 'mkdir': {
                let name = args[0];
                if (!name) return 'mkdir: missing operand';

                name = normalizeName(name);

                const dir = getCurrentDir();
                if (dir.children[name]) return 'mkdir: directory already exists';

                dir.children[name] = { type: 'dir', children: {} };
                updateFileSystem({ ...fileSystemRef });
                return null;
            }


            case 'echo':
                return args.join(' ') || null;

            case 'touch': {
                let fileName = args[0];
                if (!fileName) return 'touch: missing operand';

                fileName = normalizeName(fileName);

                const dir = getCurrentDir();
                if (dir.children[fileName]) return 'touch: file already exists';
                if (!fileName.includes('.')) return 'touch: cannot create directories';

                dir.children[fileName] = { type: 'file', content: '' };
                updateFileSystem({ ...fileSystemRef });
                return null;
            }


            case 'rm': {
                let fileName = args[0];
                if (!fileName) return 'rm: missing operand';

                fileName = normalizeName(fileName);

                const dir = getCurrentDir();
                const children = dir.children || {};

                // wildcard mode
                if (fileName.includes('*')) {
                    const regexPattern = '^' + fileName.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$';
                    const regex = new RegExp(regexPattern);

                    const matches = Object.keys(children).filter(
                        name => regex.test(name) && children[name].type === 'file'
                    );

                    if (matches.length === 0) return `rm: cannot remove '${fileName}': No matching files`;

                    matches.forEach(name => delete children[name]);
                    updateFileSystem({ ...fileSystemRef });
                    return null;
                }

                // literal mode
                if (!children[fileName]) return `rm: cannot remove '${fileName}': No such file or directory`;
                if (children[fileName].type !== 'file') return `${fileName} is a directory`;

                delete children[fileName];
                updateFileSystem({ ...fileSystemRef });
                return null;
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

                let pattern = filteredArgs[0];
                if (!pattern) return 'rmdir: missing operand';

                pattern = normalizeName(pattern);

                const dir = getCurrentDir();
                const children = dir.children || {};

                const escapeRegex = s =>
                    s.replace(/[-[\]/{}()+?.\\^$|]/g, '\\$&').replace(/\*/g, '.*');

                const isWildcard = pattern.includes('*');
                const regex = isWildcard ? new RegExp('^' + escapeRegex(pattern) + '$') : null;

                const targets = Object.keys(children).filter(name => {
                    const node = children[name];
                    const match = isWildcard ? regex.test(name) : name === pattern;
                    return match && (node.type === 'dir' || node.type === 'burn');
                });

                if (targets.length === 0)
                    return `rmdir: failed to remove '${pattern}': No matching directories`;

                const errors = [];

                targets.forEach(name => {
                    const node = children[name];
                    const isEmpty = !node.children || Object.keys(node.children).length === 0;

                    if (isEmpty || force) {
                        delete children[name];
                    } else {
                        errors.push(`rmdir: failed to remove '${name}': Directory not empty (use -f to force)`);
                    }
                });

                updateFileSystem({ ...fileSystemRef });
                return errors.join('\n') || null;
            }




            case 'clear':
                return '__CLEAR__';

            case 'tree': {
                const dir = getCurrentDir();
                return '.\n' + printTree(dir);
            }

            case "cp": {
                const [srcPattern, destArg] = args;
                if (!srcPattern || !destArg) return "cp: missing file operand";

                const cwd = getCurrentDir();
                const children = cwd.children || {};

                // Wildcard handling
                const isWildcard = srcPattern.includes("*");
                const regex = isWildcard
                    ? new RegExp("^" + srcPattern.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$")
                    : null;

                const matched = isWildcard
                    ? Object.keys(children).filter(n => regex.test(n) && children[n].type === "file")
                    : [srcPattern];

                if (matched.length === 0)
                    return `cp: cannot stat '${srcPattern}': No such file or directory`;

                // Resolve destination path
                const destResolved = resolvePath(destArg);

                let destParent = null;
                let destName = null;
                let destNode = null;
                let destExists = false;

                if (destResolved) {
                    // Full path (folder or file)
                    destParent = fileSystemRef["/"];
                    for (let i = 1; i < destResolved.length - 1; i++) {
                        destParent = destParent.children[destResolved[i]];
                    }
                    destName = destResolved[destResolved.length - 1];
                    destNode = destParent.children[destName];
                    destExists = !!destNode;
                } else {
                    // Destination is relative to current directory
                    destParent = cwd;
                    destName = destArg;
                    destNode = cwd.children[destName];
                    destExists = !!destNode;
                }

                const errors = [];

                for (const name of matched) {
                    const node = children[name];
                    if (!node || node.type !== "file") {
                        errors.push(`cp: cannot stat '${name}'`);
                        continue;
                    }

                    // --- Case 1: Destination is existing folder ---
                    if (destExists && (destNode.type === "dir" || destNode.type === "burn")) {
                        const newName = name; // same file name inside folder

                        // Deep copy the file
                        destNode.children[newName] = {
                            type: "file",
                            content: node.content
                        };

                        continue;
                    }

                    // --- Case 2: Multiple sources but dest is NOT a folder → error ---
                    if (matched.length > 1 && !destExists) {
                        errors.push(`cp: target '${destArg}' is not a directory`);
                        continue;
                    }

                    // --- Case 3: Single source and dest does not exist → rename copy ---
                    destParent.children[destName] = {
                        type: "file",
                        content: node.content
                    };
                }

                updateFileSystem({ ...fileSystemRef });

                return errors.join("\n") || null;
            }

            case "nano": {
                const filename = args[0];
                if (!filename) return "nano: missing filename";

                const dir = getCurrentDir();
                const file = dir.children[filename];

                // Open existing or create blank
                const content = file?.content || "";

                return { __NANO__: { filename, content } };
            }


            case "mv": {
                const [srcPattern, destArg] = args;
                if (!srcPattern || !destArg) return "mv: missing file operand";

                const dir = getCurrentDir();
                const children = dir.children || {};

                // --- Resolve destination path ---
                const destPath = resolvePath(destArg);
                let destParent = null;
                let destName = null;

                if (destPath) {
                    // Destination is a full path
                    destParent = fileSystemRef["/"];
                    for (let i = 1; i < destPath.length - 1; i++) {
                        destParent = destParent.children[destPath[i]];
                    }
                    destName = destPath[destPath.length - 1];
                } else {
                    // Destination is NOT a path → treat literally
                    destParent = dir;
                    destName = destArg;
                }

                const escapeRegex = s =>
                    s.replace(/[-[\]/{}()+?.\\^$|]/g, "\\$&").replace(/\*/g, ".*");

                const isWildcard = srcPattern.includes("*");
                const regex = isWildcard ? new RegExp("^" + escapeRegex(srcPattern) + "$") : null;

                const matchedFiles = isWildcard
                    ? Object.keys(children).filter(name => regex.test(name))
                    : [srcPattern];

                if (matchedFiles.length === 0) {
                    return `mv: cannot stat '${srcPattern}': No such file or directory`;
                }

                const errors = [];

                for (const name of matchedFiles) {
                    const fileNode = children[name];
                    if (!fileNode) {
                        errors.push(`mv: cannot stat '${name}': No such file or directory`);
                        continue;
                    }

                    // Case 1: Destination is a directory
                    if (destParent.children && destParent.children[destName]
                        && (destParent.children[destName].type === "dir" ||
                            destParent.children[destName].type === "burn")) {

                        const destFolder = destParent.children[destName];

                        if (destFolder.children[name]) {
                            errors.push(`mv: cannot move '${name}': destination '${destName}/${name}' already exists`);
                            continue;
                        }

                        destFolder.children[name] = fileNode;
                        delete children[name];
                        continue;
                    }

                    // Case 2: Single file rename
                    if (matchedFiles.length === 1) {
                        destParent.children[destName] = fileNode;
                        delete children[name];
                        continue;
                    }

                    // Case 3: Multiple source files but dest is not folder
                    errors.push(`mv: target '${destArg}' is not a directory`);
                }

                updateFileSystem({ ...fileSystemRef });

                return errors.join("\n") || null;
            }




            default:
                return `Command not found: ${command} `;
        }
    }

    return { runCommand, getPromptPath, getSuggestions };
}

export { createCommandProcessor };