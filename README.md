# Cri Smile Games - React Vite Project

A modern React implementation of the Cri Smile Games website, built with Vite for fast development and optimized static site generation.

## 🚀 Features

- **React 18** with modern hooks and functional components
- **Vite** for lightning-fast development and optimized builds
- **GSAP** animations for smooth transitions and effects
- **WebGL cloud animations** using the Klouds library
- **Responsive design** that works on all devices
- **Static Site Generation** ready for deployment anywhere
- **Email subscription** functionality with Google Apps Script integration

## 📁 Project Structure

```
├── public/                 # Static assets (videos, fonts, favicons, etc.)
│   ├── assets/
│   │   ├── favicon/       # Favicon files
│   │   ├── fonts/         # Custom fonts (Dongle, NicoMoji)
│   │   └── videos/        # Logo animation videos
│   └── lib/               # External libraries (klouds.js)
├── src/
│   ├── components/        # React components
│   │   ├── HeroSection.jsx
│   │   ├── MainContent.jsx
│   │   ├── CloudCanvas.jsx
│   │   └── EmailForm.jsx
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles
│   └── App.css           # Component styles
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── .gitignore           # Git ignore rules
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Create the project directory and navigate to it:**

   ```bash
   mkdir cri-smile-games-react
   cd cri-smile-games-react
   ```

2. **Copy the project files** (use the artifacts provided above to create each file)

3. **Move your assets to the public directory:**

   ```
   public/
   ├── assets/
   │   ├── favicon/           # Copy your favicon files here
   │   ├── fonts/             # Copy your font files here
   │   └── videos/            # Copy your video files here
   └── lib/
       └── klouds.js         # Copy your klouds.js library here
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building for Production

Build the static files:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📦 Deployment

The built static files can be deployed to any static hosting service:

- **Vercel**: `npm i -g vercel && vercel --prod`
- **Netlify**: Drag and drop the `dist` folder to Netlify
- **GitHub Pages**: Push the `dist` contents to your gh-pages branch
- **Any web server**: Upload the `dist` contents to your web root

## 🔧 Configuration

### Environment Variables

If you need to change the Google Apps Script URL or other configuration:

1. Create a `.env` file in the root directory
2. Add your variables:
   ```
   VITE_FORM_SCRIPT_URL=your_google_apps_script_url_here
   ```
3. Update the EmailForm component to use the environment variable:
   ```javascript
   const scriptURL =
     import.meta.env.VITE_FORM_SCRIPT_URL || "your_fallback_url";
   ```

### Customizing Animations

The GSAP animations can be customized in each component:

- **HeroSection.jsx**: Logo and hero section animations
- **MainContent.jsx**: Content fade-in animations
- **EmailForm.jsx**: Success message animations

### Cloud Animation Settings

Modify the cloud animation in `CloudCanvas.jsx`:

```javascript
new window.klouds.create({
  selector: canvasRef.current,
  speed: 3, // Animation speed
  layerCount: 3, // Number of cloud layers
  bgColor: "#99e9fc", // Background color
  cloudColor1: "#fae4b5", // First cloud color
  cloudColor2: "#ffffff", // Second cloud color
});
```

## 🔄 Migration Notes

### Key Changes from Original HTML:

1. **Component Architecture**: Split into reusable React components
2. **State Management**: Uses React hooks for state management
3. **Effect Management**: UseEffect hooks replace DOM event listeners
4. **Module System**: ES6 imports replace script tags
5. **Asset Loading**: Vite handles asset optimization and loading

### Files Organization:

- `script.js` → Split into multiple component files
- `styles.css` → Split into `index.css` (global) and `App.css` (component styles)
- `index.html` → Simplified, with React mounting point
- External libraries → Moved to `public/lib/` for static loading

## 🐛 Troubleshooting

### Common Issues:

1. **Video not loading**: Ensure video files are in `public/assets/videos/`
2. **Fonts not loading**: Check font files are in `public/assets/fonts/`
3. **Klouds animation not working**: Verify `klouds.js` is in `public/lib/`
4. **GSAP animations not smooth**: Check React StrictMode isn't interfering

### Development Tips:

- Use React Developer Tools browser extension for debugging
- Check browser console for any asset loading errors
- Ensure all asset paths start with `./` for relative imports
- Test on different devices using browser dev tools

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- WebGL support required for cloud animations

## 🔧 Advanced Configuration

### Custom Build Settings

Modify `vite.config.js` for advanced build customization:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animations: ["gsap"],
        },
      },
    },
  },
  base: "./", // Use './' for relative paths
  publicDir: "public",
});
```

### Performance Optimization

The build process automatically:

- Minifies CSS and JavaScript
- Optimizes images and assets
- Tree-shakes unused code
- Generates efficient chunk splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is private and proprietary to Cri Smile Games.

---

**Happy coding! 🎮✨**
