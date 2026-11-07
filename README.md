# .JO — Just Open

A multi-page portfolio for Joiamae that brings graphic design and computer science work together. The palette follows the mood board: tomato red (`#D31914`), brick red (`#AE132B`), cream (`#FFFFC9`), lime (`#A8DA00`), and mustard (`#EEC446`). The hand-drawn globe logo and orchard apple scene anchor the visual identity.

## Pages

- `index.html` — Home
- `about.html` — About, promotional features, and introduction-video placeholder
- `skills.html` — Skills and tools
- `certifications.html` — Cisco Networking Academy certificate preview and original PDF
- `portfolio.html` — Eight graphic design and web design projects
- `connect.html` — Email, phone, GitHub, and featured website

## Add the introduction video

The About page currently shows a poster-style placeholder using the profile photo. When your video is ready, place an MP4 in `assets/WEBSITE/` (for example, `intro.mp4`) and replace the `.intro-video-placeholder` block in `about.html` with a `<video controls playsinline poster="assets/WEBSITE/Ruma.png"><source src="assets/WEBSITE/intro.mp4" type="video/mp4"></video>`. Keep the `intro-video-placeholder` class on the video so it keeps the same layout.

## Open in Visual Studio Code

1. Unzip the downloaded project folder.
2. In Visual Studio Code, choose **File → Open Folder…** and select `Applecore-Portfolio`.
3. Open `index.html` and preview it in a browser. The site uses plain HTML, CSS, and JavaScript, with no build step or packages required.

Google Fonts load when internet is available; fallback fonts are included. The contact form creates a prefilled email draft in your mail app; it does not send messages by itself.

## Personalize

Replace sample artwork in `assets/WEBSITE/`, update project details in `portfolio.html`, and adjust skills in `skills.html` as needed. Add further certificates to `certifications.html`.
