# Amnaya & Priyanshu Wedding

## Current State
The wedding website has sections: Hero, CouplePhoto, OurStory, BasicStuff, Schedule, FAQ, RSVP, Footer. There is a CouplePhotoSection showing 2 photos side by side but no dedicated photo gallery section.

## Requested Changes (Diff)

### Add
- PhotoGallerySection: a full gothic-themed photo gallery section showcasing all 3 uploaded couple photos in a grid/masonry layout with B&W gothic filter, hover effects (color reveal or zoom), and a lightbox modal for fullscreen viewing. Inserted between RSVPSection and FooterSection (or before RSVP).

### Modify
- WeddingWebsite: Add <PhotoGallerySection /> with a HeartbeatDivider, placed before FooterSection.

### Remove
- Nothing removed.

## Implementation Plan
1. Create PhotoGallerySection component using all 3 uploaded images.
2. Apply grayscale gothic filter, with hover effect to partially reveal color or glow.
3. Add lightbox: clicking a photo opens a fullscreen overlay with close button and prev/next navigation.
4. Add section heading "Our Moments" in gothic script style.
5. Insert section into WeddingWebsite assembly with HeartbeatDivider.
