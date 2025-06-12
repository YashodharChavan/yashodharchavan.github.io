await fetch("https://api.github.com/repos/YashodharChavan/Twitter-Home-Page-Clone/contents/README.md")
  .then(res => res.json())
  .then(file => {
    const content = atob(file.content);  // decode Base64
    console.log(content);
  });
