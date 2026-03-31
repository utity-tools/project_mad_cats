# 🤖 project_mad_cats| Cat Gallery

A React experience focused on **Z-axis immersive navigation**.

<p align="center">
  <img src="https://github.com/user-attachments/assets/b122a5c9-59df-4592-920d-d8438132754d" width="100%" alt="Technical Showcase">
</p>

---

### 🛠️ The Tech Stack
* ⚛️ **React 18 & Vite** - Ultra-fast UI architecture.
* 🎭 **Framer Motion** - 60fps Scroll-to-Depth mapping engine.
* 🎨 **Tailwind CSS** - Modern mobile-first responsive design.
* 🛰️ **Vercel** - Edge Deployment & CI/CD.
* 🤖 **AI-Augmented** - Architected in collaboration with **Claude 3.5 Sonnet**.

---

### ⚙️ Core Technical Implementation

The engine maps vertical scroll to a 3D tunnel effect:

```javascript
const { scrollYProgress } = useScroll({ target: containerRef });
const zTranslation = useTransform(scrollYProgress, [0, 1], ["0px", "3000px"]);

return (
  <motion.div style={{ translateZ: zTranslation }}>
    {/* Cinematic Content */}
  </motion.div>


---

### 📦 Quick Start
1. `git clone https://github.com/tu-usuario/project_mad_cats.git`
2. `npm install`
3. `npm run dev`

---

### 📄 License
**MIT License** - Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

---

*Developed with ❤️ and AI-Augmented Engineering.*

);