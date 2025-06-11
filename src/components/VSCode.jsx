import Editor from "@monaco-editor/react";
import React from 'react'
import SimpleFrame from './SimpleFrame'


const VSCode = ({ code, language }) => {
    return (
        <SimpleFrame
            title="VS Code"
            id='vscode'
            icon="iPhotos"
            height="500"
            width="600"
            minWidth="600"
            minHeight="500"
            showDimensions={false}
            hasDrawer={false}
            hasPadding={false}
            optionalBackground={false}
            isResizable={true}
        >
            <Editor
                height={400}
                defaultLanguage={language}
                defaultValue={code}
                theme="vs"
                options={{
                    readOnly: true,
                    fontFamily: 'Consolas, Courier New, monospace',
                    fontSize: 13,
                    lineNumbers: 'on',
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    renderLineHighlight: 'line',
                    wordWrap: 'on',
                }}
            />





        </SimpleFrame>
    );
};


export default VSCode