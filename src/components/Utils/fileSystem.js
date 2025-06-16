import genericFolder from '../../assets/folders/GenericFolderIcon.ico'
import documentsFolder from '../../assets/folders/DocumentsFolderIcon.ico'
import libraryFolder from '../../assets/folders/LibraryFolderIcon.ico'
import movieFolder from '../../assets/folders/MovieFolderIcon.ico'
import musicFolder from '../../assets/folders/MusicFolderIcon.ico'
import picturesFolder from '../../assets/folders/PicturesFolderIcon.ico'
import publicFolder from '../../assets/folders/PublicFolderIcon.ico'
import systemFolder from '../../assets/folders/SystemFolderIcon.ico'
import sitesFolder from '../../assets/folders/SitesFolderIcon.ico'
import readOnlyFolder from '../../assets/folders/ReadOnlyFolderIcon.ico'
import userFolder from '../../assets/folders/UsersFolderIcon.ico'
import applicationFolder from '../../assets/folders/ApplicationsFolderIcon.ico'
import txt from '../../assets/folders/TXT.ico'
import clippingText from '../../assets/folders/ClippingText.ico'


const fileSystem = {
  '/': {
    type: 'dir',
    children: {
      Applications: { type: 'dir', children: {}, },
      System: {
        type: 'dir',
        children: {
          Library: { type: 'dir', children: {} },
          dev: { type: 'dir', children: {} },
        }
      },
      Library: { type: 'dir', children: {} },
      Users: {
        type: 'dir',
        children: {
          yashodhar: {
            type: 'dir',
            children: {
              Documents: { type: 'dir', children: {} },
              Music: { type: 'dir', children: {} },
              Movies: { type: 'dir', children: {} },
              Pictures: { type: 'dir', children: {} },
              Public: { type: 'dir', children: {} },
              Sites: { type: 'dir', children: {} },
              'file.txt': { type: 'file', content: 'Hello World' },
              Desktop: {type: 'dir', children: {
                'about.md': {type: 'file', content: 'This is a markdown file.'},
              }}
            }
          }
        }
      },
      etc: { type: 'dir', children: {} },
      tmp: { type: 'dir', children: {} },
      var: { type: 'dir', children: {} },
      bin: { type: 'dir', children: {} }
    }
  }
};

for(let i=0; i<fileSystem.length; i++) {
  console.log(i)
}


const rootFileOptions = [
    { label: "Movies", icon: movieFolder },
    { label: "Music", icon: musicFolder },
    { label: "Pictures", icon: picturesFolder },
    { label: "Public", icon: publicFolder },
    { label: "Documents", icon: documentsFolder },
    { label: "home", icon: genericFolder },
    { label: "etc", icon: genericFolder },
    { label: "Library", icon: libraryFolder },
    { label: "System", icon: systemFolder },
    { label: "Sites", icon: sitesFolder },
    { label: "Users", icon: userFolder },
    { label: "Applications", icon: applicationFolder },
    { label: "Desktop", icon: applicationFolder },
    { label: ".md", icon: clippingText },
    { label: ".txt", icon: txt },
]



export { fileSystem, rootFileOptions }