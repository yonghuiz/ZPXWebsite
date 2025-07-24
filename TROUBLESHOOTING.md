# Troubleshooting Guide - Path Issues

## Issue: npm scripts fail due to Chinese characters in path

### Problem Description
The current project path contains Chinese characters (`BaiduSyncdisk`), which can cause issues with npm scripts and node module resolution on Windows systems.

### Error Symptoms
```
'D\web\ZpxWebsite\node_modules\.bin\' is not recognized as an internal or external command
Error: Cannot find module 'C:\BaiduSyncdisk\ZipcodeXpress\vite\bin\vite.js'
```

### Solutions

#### Option 1: Move Project to ASCII Path (Recommended)
1. **Create new folder with ASCII-only characters:**
   ```bash
   mkdir C:\Dev\ZipcodeXpress\website
   ```

2. **Copy project files:**
   ```bash
   xcopy "C:\BaiduSyncdisk\ZipcodeXpress\R&D\web\ZpxWebsite\*" "C:\Dev\ZipcodeXpress\website\" /s /e
   ```

3. **Navigate to new location:**
   ```bash
   cd C:\Dev\ZipcodeXpress\website
   ```

4. **Reinstall dependencies:**
   ```bash
   npm install
   npm run dev
   ```

#### Option 2: Use Alternative Commands
If moving is not possible, try these alternatives:

1. **Direct node execution:**
   ```bash
   node .\node_modules\vite\bin\vite.js
   ```

2. **PowerShell with quotes:**
   ```bash
   & ".\node_modules\.bin\vite.cmd"
   ```

3. **Use yarn instead of npm:**
   ```bash
   yarn install
   yarn dev
   ```

#### Option 3: Set Environment Variables
```bash
# Set shorter path aliases
set NODE_PATH=%CD%\node_modules
set PATH=%CD%\node_modules\.bin;%PATH%
vite
```

### Prevention
- Always use ASCII-only characters in development paths
- Consider using English folder names for development projects
- Use tools like `mklink` to create symbolic links if needed

### Testing the Fix
After implementing any solution:
1. `npm run dev` should start the development server
2. `npm run build` should create production build
3. `npm run preview` should serve the built application

### Current Project Status
✅ **Complete Features:**
- Modern React.js website structure
- Brevo-inspired design system
- Animated customer logo carousel
- Responsive header with mobile menu
- Hero section with floating cards
- Features showcase with hover effects
- Professional styling and animations

📋 **Next Steps:**
1. Resolve path issues using solutions above
2. Test all components in browser
3. Optimize performance and accessibility
4. Add additional features as needed
