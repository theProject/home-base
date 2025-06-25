agents.md

## Refactor interactive cards to prevent crash and improve UX

### Summary

Replaced the unstable `ExpandableCardDemo` modal system — which caused client-side exceptions — with a lightweight and elegant `PrestigePopup`. This modal appears only when a card is hovered, clicked, or tapped. It displays a floating branded platform message and can be easily dismissed, offering context without disrupting layout or flow.

Also corrected the hero subtext under the animated intro to better reflect the brand’s voice — a bold, defiant declaration of skill, passion, and innovation.

---

### Implementation Details

#### 🎮 PrestigePopup

- Floating modal triggered on card hover/tap/click
- Displays relevant platform logo (Nintendo, PlayStation, Steam, etc.)
- New message tone:

  > **"Coming soon to this platform. We're developing something great and look forward to sharing it with you."**

- Clean visual with smooth framer-motion animation
- Auto-dismiss on escape, outside click, or hover leave
- Preserves original card layout — no mutation to `cards.map()`

---

#### 💬 Hero Subtext Fix

Replaced:

> _“We don't just build digital experiences…”_

With the following JSX/HTML (fixed for spacing issues):

```tsx
<p className="text-[1.2em] leading-relaxed font-sans">
  Forget the degrees. We are{" "}
  <span className="text-white">the</span>{" "}
  <span className="text-[#e20074]">Project.</span>, the{" "}
  <strong className="text-[#e20074]">relentless</strong> misfits who learned by doing, we learned by{" "}
  <span className="text-[#00FFFF]">hacking code apart</span> and learning through{" "}
  <strong className="text-white">trial and error</strong>, fueled by a{" "}
  <strong className="text-white">burning craving</strong> for design and{" "}
  <strong className="text-white">innovation</strong>. We don't just create; we{" "}
  <strong className="text-white">defy expectations</strong>, building{" "}
  <strong className="text-white">digital marvels</strong> that prove our worth with every line of code.
</p>