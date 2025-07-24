<<<<<<< HEAD
# ZipcodeXpress Website

A modern, responsive website for ZipcodeXpress built with React.js and Vite, inspired by Brevo.com's clean design and smooth animations.

## 🚀 Features

- **Modern Design**: Clean, professional layout inspired by Brevo.com
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Customer Logo Carousel**: Animated sliding customer logos
- **Performance Optimized**: Built with Vite for fast development and production builds
- **Accessibility**: WCAG compliant with proper focus management

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **Animation Library**: Framer Motion
- **Icons**: React Icons
- **Styling**: Modern CSS with CSS Variables
- **Font**: Inter (Google Fonts)

## 📦 Project Structure

```
ZpxWebsite/
├── public/
│   ├── logo.svg           # Company logo
│   └── vite.svg          # Vite logo
├── src/
│   ├── components/        # React components
│   │   ├── Header/       # Navigation header
│   │   ├── Hero/         # Hero section
│   │   ├── CustomerLogos/ # Animated customer logos
│   │   └── Features/     # Features showcase
│   ├── assets/           # Static assets
│   ├── App.jsx           # Main app component
│   ├── App.css           # Global app styles
│   ├── index.css         # Global CSS variables and base styles
│   └── main.jsx          # App entry point
├── .github/
│   └── copilot-instructions.md  # GitHub Copilot instructions
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563eb` (inspired by Brevo)
- **Text Primary**: `#1e293b`
- **Text Secondary**: `#64748b`
- **Background**: `#ffffff`, `#f8fafc`, `#f1f5f9`

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Header**: Fixed navigation with smooth backdrop blur
- **Hero**: Large hero section with floating cards animation
- **Customer Logos**: Infinite horizontal scroll animation
- **Features**: Grid layout with hover animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ZpxWebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### Header Component
- Fixed navigation with backdrop blur
- Responsive mobile menu
- Smooth scroll to sections
- Brand logo and navigation links

### Hero Component
- Animated text with stagger effects
- Call-to-action buttons
- Statistics display
- Floating cards animation

### Customer Logos Component
- Infinite horizontal scroll
- Hover effects on logo items
- Trust indicators with icons
- Responsive grid layout

### Features Component
- Grid layout for feature cards
- Hover animations and transforms
- Icon and benefit list display
- Call-to-action section

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

## 🎨 Animation Details

### Framer Motion Animations
- **Page Load**: Staggered entrance animations
- **Scroll Triggered**: Elements animate on scroll into view
- **Hover Effects**: Scale and transform on hover
- **Logo Carousel**: Infinite horizontal scroll with CSS transforms

### Performance Considerations
- Hardware-accelerated CSS transforms
- `will-change` properties for smooth animations
- Reduced motion support via `prefers-reduced-motion`

## 🔧 Development

### Adding New Components
1. Create component folder in `src/components/`
2. Include `.jsx` and `.css` files
3. Import and use in parent components
4. Follow existing naming conventions

### Styling Guidelines
- Use CSS Variables for consistency
- Follow BEM methodology for class names
- Mobile-first responsive design
- Maintain accessibility standards

### Animation Guidelines
- Use Framer Motion for complex animations
- CSS transforms for simple hover effects
- Consider performance impact
- Test on lower-end devices

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙋‍♂️ Support

For questions or support, please contact the development team.

---

**Built with ❤️ for ZipcodeXpress**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
