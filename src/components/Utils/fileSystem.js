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
import pdf from '../../assets/folders/PDF.ico'
import bin from '../../assets/folders/BIN.ico'
import zip from '../../assets/folders/ZIP.ico'
import html from '../../assets/folders/HTML.ico'
import ico from '../../assets/folders/ICO.ico'
import finder from '../../assets/icons/applications/Finder.ico'
import dashboard from '../../assets/icons/applications/Dashboard.ico'
import mail from '../../assets/icons/applications/Mail.ico'
import safari from '../../assets/icons/applications/Safari.ico'
import dictionary from '../../assets/icons/applications/Dictionary.ico'
import contacts from '../../assets/icons/applications/Contacts.ico'
import aboutme from '../../assets/icons/applications/AboutMe.ico'
import xCode from '../../assets/icons/applications/Xcode.ico'
import textEdit from '../../assets/icons/applications/TextEdit.ico'
import terminal from '../../assets/icons/applications/Terminal.ico'
import calculator from '../../assets/icons/applications/Calculator.ico'

const fileSystem = {
  '/': {
    type: 'dir',
    children: {
      Applications: {
        type: 'dir', children: {
          'Finder.app': { type: 'app', children: {} },
          'Dashboard.app': { type: 'app', children: {} },
          'Mail.app': { type: 'app', children: {} },
          'Safari.app': { type: 'app', children: {} },
          'Dictionary.app': { type: 'app', children: {} },
          'Contacts.app': { type: 'app', children: {} },
          'About Me.app': { type: 'app', children: {} },
          'XCode.app': { type: 'app', children: {} },
          'TextEdit.app': { type: 'app', children: {} },
          'Terminal.app': { type: 'app', children: {} },
          'Calculator.app': { type: 'app', children: {} },
        },
      },
      System: {
        type: 'dir',
        children: {
          Library: { type: 'dir', children: {} },
          dev: { type: 'dir', children: {} },
        }
      },
      Library: {
        type: 'dir', children: {
          'Fonts': { type: 'dir', children: {} },
          'Application Support': { type: 'dir', children: {} },
          'Preferences': { type: 'dir', children: {} }
        }
      },
      Users: {
        type: 'dir',
        children: {
          yashodhar: {
            type: 'dir',
            children: {
              Documents: {
                type: 'dir', children: {
                  Academics: { type: 'dir', children: {} },
                  Certificates: {
                    type: 'dir', children: {
                      'Programming in C.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/certificates/Programming%20in%20C.pdf' },
                      'Introduction to Python.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/certificates/Introduction%20to%20Python.pdf' },
                      'Programming Using C++.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/certificates/Programming%20Using%20C++.pdf' },
                      'Introduction to AI Simplilearn.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/certificates/Introduction%20to%20AI%20Simplilearn.pdf' },
                      'Introduction to ChatGPT.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/certificates/introduction%20to%20chatGPT.pdf' },
                    }
                  },
                  Books: {
                    type: 'dir', children: {
                      'Self Help': {
                        type: 'dir', children: {
                          'Atomic Habits.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Atomic%20Habits.pdf' },
                          'Mindset.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Mindset.pdf' },
                          'The 48 Laws of Power.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/The%2048%20Laws%20Of%20Power.pdf' },
                          'Think And Grow Rich.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Think%20And%20Grow%20Rich.pdf' },
                          'The 7 Habits of Highly Effective People.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/7%20Habits%20of%20Highly%20Effective%20People.pdf' },
                        }
                      },
                      Finance: {
                        type: 'dir', children: {
                          'Rich Dad Poor Dad.pdf': { type: 'file', href: "https://yashodharchavan.github.io/books/Rich%20Dad%20Poor%20Dad.pdf" },
                          'Psychology of Money.pdf': { type: 'file', href: "https://yashodharchavan.github.io/books/Psychology%20of%20Money.pdf" },
                        }
                      },
                      Biography: {
                        type: 'dir', children: {
                          'The Autobiography of A Yogi.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Autobiography%20of%20a%20Yogi.pdf' },
                          'Steve Jobs.pdf': { type: 'file', href: "https://yashodharchavan.github.io/books/Steve%20Jobs.pdf" },
                          'Mans Search for Meaning.pdf': { type: 'file', href: "https://yashodharchavan.github.io/books/Man's%20Search%20for%20Meaning.pdf" },
                          'Shoe Dog.pdf': { type: 'file', href: "https://www.freespiritualebooks.com/uploads/5/0/5/8/50589505/shoe-dog.pdf" },
                        }
                      },
                    }
                  },
                  'Resume.pdf': { type: 'file', href: 'https://docs.google.com/document/d/1Sa169BawHnjk_CpzQYoSpnZi2HY1esQ0tCGA5tCWTMM/edit?usp=sharing' },

                }
              },
              Music: { type: 'dir', children: {} },
              Movies: { type: 'dir', children: {} },
              Pictures: { type: 'dir', children: {} },
              Public: { type: 'dir', children: {} },
              Sites: { type: 'dir', children: {} },
              'file.txt': { type: 'file', content: 'Hello World' },
              Desktop: {
                type: 'dir', children: {
                  'about.md': { type: 'file', content: 'This is a markdown file.' },
                }
              }
            }
          }
        }
      },
      etc: {
        type: 'dir', children: {
          passwd: { type: 'dir', children: {} },
          shadow: { type: 'dir', children: {} },
          group: { type: 'dir', children: {} },
          hostname: { type: 'dir', children: {} },
          network: { type: 'dir', children: {} },
          systemd: { type: 'dir', children: {} },
          ssh: { type: 'dir', children: {} },
          zsh: { type: 'dir', children: {} },
        }
      },
      tmp: {
        type: 'dir', children: {
          'mysql.stock': { type: 'dir', children: {} },
          'systemd-private': { type: 'dir', children: {} },
        }
      },
      var: {
        type: 'dir', children: {
          log: { type: 'dir', children: {} },
          tmp: { type: 'dir', children: {} },
          run: { type: 'dir', children: {} },
          spool: { type: 'dir', children: {} },
          cache: { type: 'dir', children: {} },
          mail: { type: 'dir', children: {} },
          lock: { type: 'dir', children: {} },
        }
      },
      bin: {
        type: 'dir', children: {
          ls: { type: 'file', content: '' },
          cat: { type: 'file', content: '' },
          write: { type: 'file', content: '' },
          append: { type: 'file', content: '' },
          exit: { type: 'file', content: '' },
          man: { type: 'file', content: '' },
          cp: { type: 'file', content: '' },
          cd: { type: 'file', content: '' },
          mv: { type: 'file', content: '' },
          pwd: { type: 'file', content: '' },
          mkdir: { type: 'file', content: '' },
          echo: { type: 'file', content: '' },
          touch: { type: 'file', content: '' },
          rm: { type: 'file', content: '' },
          rmdir: { type: 'file', content: '' },
          clear: { type: 'file', content: '' },
          tree: { type: 'file', content: '' },
        }
      }
    }
  }
};


const applicationIcons = [
  { label: 'Finder.app', icon: finder },
  { label: 'Dashboard.app', icon: dashboard },
  { label: 'Mail.app', icon: mail },
  { label: 'Safari.app', icon: safari },
  { label: 'Dictionary.app', icon: dictionary },
  { label: 'Contacts.app', icon: contacts },
  { label: 'About Me.app', icon: aboutme },
  { label: 'XCode.app', icon: xCode },
  { label: 'TextEdit.app', icon: textEdit },
  { label: 'Terminal.app', icon: terminal },
  { label: 'Calculator.app', icon: calculator },
]


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
  { label: ".pdf", icon: pdf },
  { label: ".bin", icon: bin },
  { label: ".zip", icon: zip },
  { label: ".html", icon: html },
  { label: ".css", icon: html },
  { label: ".js", icon: html },
  { label: ".jsx", icon: html },
  { label: ".ico", icon: ico },
]



export { fileSystem, rootFileOptions, applicationIcons }