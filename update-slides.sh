#!/bin/bash

# Archive current slides
echo "📦 Archiving current slides..."
cp slides.md archive/$(date +%Y-%m-%d)-slides.md
git add archive/

# Open slides.md for editing
echo "✏️  Opening slides.md for editing..."
open -e slides.md

# Wait for user to finish editing
echo ""
echo "Edit your slides, save the file, then press ENTER here to publish..."
read

# Commit and push
git add slides.md
git commit -m "week of $(date +%Y-%m-%d) updates"
git push

echo "✅ Done! Your slides are live at https://sandeepkittur.github.io/my-slides/"
