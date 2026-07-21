# Connect Workflows Image Transition

## Goal

Replace the image in the “Connect workflows” stage with the supplied iStock
illustration while preserving the website’s dark visual system and avoiding a
visible vertical seam between the text panel and image.

## Design

- Use `istockphoto-1473832849-1024x1024.jpg` as the stage image.
- Keep the image intentionally lighter than the first two chapter images.
- Render it at 70% opacity over a cool blue-grey background.
- Add a broad left-to-right transition that begins with the exact ink colour
  of the text panel, moves through a cool blue-grey tone, and fades into the
  image.
- Limit this treatment to the “Connect workflows” stage. The existing tasks
  and knowledge treatments remain unchanged.
- Preserve the current crop behaviour, section dimensions, text, and navigation.

## Verification

- Check the full stage at a 1920×1080 desktop viewport.
- Confirm there is no hard vertical colour boundary at the panel join.
- Confirm the new image remains readable and visually lighter than chapters 1
  and 2 without appearing disconnected from the page.
- Confirm the image loads at its native dimensions and that the page produces
  no browser or JavaScript errors.
