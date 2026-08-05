# Slides Update Playbook

Live URL: https://sandeepkittur.github.io/my-slides
GitHub: https://github.com/sandeepkittur/my-slides

## For Contributors — No Terminal Needed

### Adding Your Slides
1. Go to github.com/sandeepkittur/my-slides/tree/main/contributors
2. Click your file (e.g. alice.md) → pencil icon to edit
3. Update your slides, each separated by ---
4. Scroll down → Commit changes

### Adding Images
1. Go to github.com/sandeepkittur/my-slides/tree/main/public
2. Click Add file → Upload files → drag your image
3. Commit changes
4. In your slides, reference it as: ![description](/your-image.png)
5. Keep filenames simple, no spaces (e.g. ux-flow.png)

### First Time? Create your file
1. Go to github.com/sandeepkittur/my-slides/tree/main/contributors
2. Click Add file → Create new file
3. Name it your-name.md (e.g. alice.md)
4. Copy content from template.md as a starting point
5. Commit new file

## For Owner (Sandeep)

1. Open Terminal (Cmd + Space, type Terminal)
2. Run: cd ~/my-slides
3. Run: ./update-slides.sh
4. Edit slides, save (Cmd + S)
5. Press Enter in Terminal to publish
6. Live in ~1 minute at https://sandeepkittur.github.io/my-slides

## Quick Reference

Contributor - edit slides: github.com → contributors → your file → pencil icon
Contributor - add image: github.com → public → Add file → Upload files
Owner - publish: cd ~/my-slides then ./update-slides.sh
View live slides: https://sandeepkittur.github.io/my-slides
View past slides: github.com → archive folder