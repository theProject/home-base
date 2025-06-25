agents.md

Configuration notes and interaction specs for dynamic behavior across bytheproject.com

/home – Experience Our Creations (Expandable Cards)

Component: ExpandCard

Cards in this section include platforms like Android, Nintendo, Steam, etc. Clicking Explore opens an expandable modal card styled as follows:

Main card layout remains unchanged.

Expanded view contains:

Full-width image from /public/

Title at top (e.g. “Nintendo”)

Red button labeled Development

Site message:

We’re still undergoing development on this section of the site. Please check back soon as we add the creativity you’ve come to expect.
Close icon (X) on top-right

Supports Escape key and outside click to dismiss

Assets Mapping:

Card Title	Image Path (public/)
Android	/AndroidDev
Nintendo	/Nintendo
PlayStation	/PlayStation
Web Dev	/ReactDev
Steam	/Steam
/home – Our Flagship Projects

This section features cards for key internal or community projects.

🃏 DarkFrost – The Intro Card Game

Button Text: Coming Soon
Behavior: No link (disabled or styled to indicate inactivity)
💬 Hello, Friend.

Button Text: Visit Site
Link: https://sayhellofriend.com
👮 Hellertown Police Department

Title: Hellertown Police Department
Description: As written in the current card
Button Text: Visit Site
Link: https://hellertownpolice.org
/projects – Tech Stack Section Anchor

Section: Our Tech Arsenal & Expertise

The phrase tech stack should act as an anchor link to this section.
Example behavior: If user clicks a link or button labeled Explore Tech, it should scroll to or route with #tech-arsenal or similar.
Project Profile Image

The top-level profile for “The Project” should use Tristan’s header logo as the profile image/avatar.
/arcade – Play Now Button Behavior

🔘 Button Rules

All games display Coming Soon in their Play Now buttons, except:
✅ Codebreaker AI

Button should say Play Now
On click: route to external URL
Link: https://frostscript.com
No embedded HTML or in-site loading for now
🧭 Mobile Navigation Enhancement

Slide-Out Menu Styling

To improve readability and polish on mobile devices, apply a background blur effect to the slide-out mobile navigation menu:

🧪 Behavior:

When the mobile nav opens, blur the background content behind it.
This ensures the nav is legible even when overlaying detailed UI elements or imagery.
✅ Suggested CSS (Tailwind or plain CSS):

If using Tailwind CSS:

<div className="backdrop-blur-md bg-white/70 dark:bg-neutral-900/60">
  <!-- nav content -->
</div>
if using vanilla css
.mobile-nav {
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.7); /* adjust for light/dark mode */
}
Notes:
	•	Apply this blur container to the sliding panel <div> only (not the full page).
	•	Consider adding a subtle shadow or border to the nav for depth.

---

## Additional Notes

- All buttons should remain consistent in size and style across dark/light modes.
- ExpandCard modals use `Framer Motion` with layoutId for shared element transitions.
- Modal scroll areas should gracefully handle text overflow with mobile-friendly behavior (`overflow-auto`, `scrollbar-width: none`).
