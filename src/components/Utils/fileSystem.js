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
import desktopFolderIcon from '../../assets/folders/DesktopFolderIcon.avif'

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
                    type: 'file', content: `Hey 👋

This project wouldn't have been possible without some amazing people and platforms. Here's a small thank-you to everyone who inspired and helped along the way.

🌟 Inspirations:

Dustin Brett
https://github.com/dustinbrett
→ The very first spark! Dustin's projects on web-based Windows 10 OS blew my mind and made me want to build something nostalgic.

Vivek9Patel
https://github.com/vivek9patel
→ After discovering Dustin, I stumbled upon Vivek's portfolio — a super creative take on web-based Ubuntu desktop UIs that pushed me further.

Gianluca Jahn
https://github.com/gianlucajahn
→ Gianluca's macOS-style web apps gave me the design direction I was looking for. Big respect to his craft.


🧠 Idea Evolution:

Originally, I thought about making a DOS-style macOS — just for fun.

Then ChatGPT casually said: “Why not go for Mac OS X Tiger?”  
...And boom, it clicked.

From that moment on, AI tools like ChatGPT (and sometimes Grok) became my late-night pair programmers — helping me figure out bugs, brainstorm features, or just stay sane.

Of course, not everything generated was perfect. Some code was a mystery box — but as any dev will tell you:
"If it works, don't touch it."


🧰 Assets & Resources:

flaticon.com — Used for most of the file and folder icons.

Internet Archive — Where I found original ICNS files. I wrote a Python script to convert them into AVIF.

reddit.com — For visual UI inspiration and old screenshots.

freepik.com — Provided wallpaper images and UI graphics.

youtube.com — Tutorials and deep dives to learn from.


❤️ Final Note:

This project isn't just a bunch of code.
It's a journey of learning, struggling, growing, and nerding out over nostalgic design.

Thanks to everyone who played a part — directly or indirectly.

— Yashodhar Chavan

` },
                  'Resume.pdf': { type: 'file', href: 'https://yashodharchavan.github.io/books/Resume.pdf' },
                  'User_Guide.txt': {
                    type: 'file', content: `Hey there 👋,

Welcome to my macOS X Tiger recreation — a tribute to the golden days of computing, rebuilt lovingly in your browser!

This isn't just a UI demo — it's a fully working system, complete with Finder, Terminal, Safari, XCode, and more. You're free to explore, break, and play with everything here.

Here's a quick guide to help you get around:

🖥️ Desktop
- Right-click to add a new folder, file, or burn folder.
- Files you create here stay right on your Desktop.
- Drag files to Trash to delete them.

📁 Finder
- Use the sidebar to browse through folders like \`Desktop\`, \`Documents\`, \`Public\`, and more.
- Use the search bar to find files (yes, it's scoped to your current path like real Spotlight!).
- Click the gear icon (top right) or right-click anywhere to create folders/files.
- Drag files to Trash to delete them.

🗃️ Trash
- Drop any unwanted file here. It vanishes instantly — no going back (just like the real Tiger days).

📬 Mail
- I wrote you a little email in the Inbox — check it out 🙂
- As well as I am waiting for you to send some 😅

🌐 Safari
- You can search the web or type full URLs.
- Some sites might not load (iframes are picky), but Google works great for queries.
- There’s also a reload button in case things go wild.

📖 Dictionary
- Type a word to get its meaning, pronunciation, and example usage.
- Only dictionary supported, no thesaurus — I'm working on it 🛠️

📇 Contacts
- Contains my contact info and Apple's — yep, even added my GitHub and LinkedIn!

🧠 About Me
- A mini app showing my skills, education, projects, and resume. If you're curious who made this — it's all in there.

🖋️ TextEdit
- Click any \`.txt\` file to open and edit.
- Changes are saved when you close the window — just like the real deal.

💻 Terminal (My Favorite!)
- Supports commands like: \`ls\`, \`cd\`, \`touch\`, \`rm\`, \`mkdir\`, \`rmdir\`, \`cat\`, \`echo\`, \`clear\`, \`pwd\`, \`tree\`, and more.
- Create files here and they'll instantly appear in Finder or Desktop.
- Try something fun like: \`cowsay Hello!\` or \`fortune\`

🛠️ XCode
- Browse the actual source code of this entire OS right from within the OS itself.
- Read-only for now. Explore how the magic was built.

⌨️ Bonus Tip
- Press \`Ctrl + Space\` to launch the Spotlight-style search from anywhere.

—

That's it!
This was made with passion, nostalgia, AI help (yes, I admit it ❤️), and a ton of caffeine ☕.

If you enjoyed exploring this — let me know!
And if you're a recruiter or dev — I'd love to chat.

Have fun & thanks for visiting 🧡

— Yashodhar Chavan
`},
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
  { label: "Desktop", icon: desktopFolderIcon },
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
  { label: ".ico", icon: ico },
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