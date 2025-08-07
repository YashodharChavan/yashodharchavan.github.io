import genericFolder from '../../assets/folders/GenericFolderIcon.avif'
import documentsFolder from '../../assets/folders/DocumentsFolderIcon.avif'
import libraryFolder from '../../assets/folders/LibraryFolderIcon.avif'
import movieFolder from '../../assets/folders/MovieFolderIcon.avif'
import musicFolder from '../../assets/folders/MusicFolderIcon.avif'
import picturesFolder from '../../assets/folders/PicturesFolderIcon.avif'
import publicFolder from '../../assets/folders/PublicFolderIcon.avif'
import systemFolder from '../../assets/folders/SystemFolderIcon.avif'
import sitesFolder from '../../assets/folders/SitesFolderIcon.avif'
import readOnlyFolder from '../../assets/folders/ReadOnlyFolderIcon.avif'
import userFolder from '../../assets/folders/UsersFolderIcon.avif'
import applicationFolder from '../../assets/folders/ApplicationsFolderIcon.avif'
import txt from '../../assets/folders/TXT.avif'
import clippingText from '../../assets/folders/ClippingText.avif'
import pdf from '../../assets/folders/PDF.avif'
import bin from '../../assets/folders/BIN.avif'
import zip from '../../assets/folders/ZIP.avif'
import html from '../../assets/folders/HTML.avif'
import ico from '../../assets/folders/ICO.avif'
import finder from '../../assets/icons/applications/Finder.avif'
import dashboard from '../../assets/icons/applications/Dashboard.avif'
import mail from '../../assets/icons/applications/Mail.avif'
import safari from '../../assets/icons/applications/Safari.avif'
import dictionary from '../../assets/icons/applications/Dictionary.avif'
import contacts from '../../assets/icons/applications/Contacts.avif'
import aboutme from '../../assets/icons/applications/AboutMe.avif'
import xCode from '../../assets/icons/applications/Xcode.avif'
import textEdit from '../../assets/icons/applications/TextEdit.avif'
import terminal from '../../assets/icons/applications/Terminal.avif'
import calculator from '../../assets/icons/applications/Calculator.avif'
import burn from '../../assets/folders/burnableFolder.avif'

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
                  Academics: {
                    type: 'dir', children: {
                      '10th result.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Academics/10th%20result.pdf' },
                      '1st semester result.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Academics/1st%20semester%20result.pdf' },
                      '2nd semester result.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Academics/2nd%20semester%20result.pdf' },
                      '3rd semester result.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Academics/3rd%20semester%20result.pdf' },
                    }
                  },
                  Certificates: {
                    type: 'dir', children: {
                      'Chakravyuh Hackathon.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Academics/chakravyuh%201.0.pdf' },
                      'ETSEF Coding Competition.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Academics/etsef%20coding%20competition.pdf' },
                      'ETSEF Coding Competition.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Academics/quiz%20and%20coding.pdf' },
                      'Quiz and Coding.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Academics/quiz%20and%20coding.pdf' },
                      'Tech Master 2K25.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Academics/tech%20master.pdf' },
                      'Technowave.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Academics/technowave.pdf' },
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
                  'Resume.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Resume.pdf' },

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
                  'Credits.txt': {
                    type: 'file', content: `This project would not have been possible without the inspiration, help, and resources provided by amazing people and platforms. I want to give them their well-deserved credit here:

Inspirations:
Dustin Brett (https://github.com/dustinbrett): The first spark of inspiration came from Dustin's projects. His work on web-based Windows 10 OS interfaces fascinated me and made me want to build something nostalgic myself.

Vivek9Patel (https://github.com/vivek9patel): After seeing Dustin's work, I came across Vivek's portfolio website which further inspired me to explore creative web clones and desktop-like UIs.

Gianluca Jahn (https://github.com/gianlucajahn): Another talented creator whose projects gave me perspective on how web-based macOS experiences can be built and designed.

Idea Evolution:
Initially, I thought of recreating an early DOS-based macOS for fun.

ChatGPT suggested aiming for something nostalgic like Mac OS X Tiger, and that hit the right nerve. I decided to proceed with that.

Throughout the project, AI (especially ChatGPT) guided me with ideas, problem-solving, and learning new things.

I also used Grok when stuck at tricky spots. Both AI systems deserve a thank-you for being my 24x7 mentor.

While I took help of AI-generated code snippets, I made sure to understand, adapt, and improve the systems myself. Some pieces remained black-boxes, but as the old dev rule says: "If it works, don't touch it."

Assets & Resources:
flaticon.com — for icons and graphics.

Internet Archive — sourced original ICNS files, converted them to ICO using Python, and finally to AVIF format.

reddit.com — for visual design inspiration.

freepik.com — used images for the desktop background.

youtube.com — for various tutorials and learning resources.

I'm thankful to everyone who contributed directly or indirectly to this learning journey.
This project was not just about coding, but about understanding how systems work, improving incrementally, and having fun while building something nostalgic.
` },
                  'Resume.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Resume.pdf' },
                  'User Guild.txt': { type: 'file', content: ''} 
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
  { label: ".avif", icon: ico },
  { label: "burn", icon: burn },
]

const academicResults = [
  { id: '10th result', href: "https://yashodharchavan.github.io/books/Academics/10th%20result.pdf" },
  { id: '1st semester result', href: "https://yashodharchavan.github.io/books/Academics/1st%20semester%20result.pdf" },
  { id: '2nd semester result', href: "https://yashodharchavan.github.io/books/Academics/2nd%20semester%20result.pdf" },
  { id: '3rd semester result', href: "https://yashodharchavan.github.io/books/Academics/3rd%20semester%20result.pdf" },
  { id: '4th semester result', href: "https://yashodharchavan.github.io/books/Academics/3rd%20semester%20result.pdf" },
]



export { fileSystem, rootFileOptions, applicationIcons, academicResults }