# 🚀 STRMLY Quick Setup Guide

## 🎯 **One-Time Setup**

### 1. Prerequisites
```bash
# Check Node.js version (must be v18+)
node --version

# Check npm version
npm --version
```

### 2. Clone & Navigate
```bash
# Navigate to project directory
cd assignment2
```

---

## 🌐 **Web App Setup**

```bash
# Step 1: Navigate to web directory
cd web

# Step 2: Install dependencies
npm install

# Step 3: Start development server
npm run dev
```

**✅ Access Web App**: http://localhost:3001/

**🔐 Login Credentials**:
- Email: `demo@strmly.com`
- Password: `demo123`

---

## 📱 **Mobile App Setup**

```bash
# Step 1: Navigate to mobile directory
cd mobile

# Step 2: Install dependencies
npm install

# Step 3: Start Expo tunnel
npx expo start --tunnel
```

**📱 Access Mobile App**:
1. Install [Expo Go](https://expo.dev/tools#client) on your phone
2. Scan QR code from terminal
3. Or use direct URL: `exp://7q36cic-anonymous-8082.exp.direct`

---

## 🔧 **Commands Reference**

### Web App Commands
```bash
cd web && npm run dev          # Start development server
cd web && npm run build        # Build for production
cd web && npm run preview      # Preview production build
```

### Mobile App Commands
```bash
cd mobile && npx expo start                    # Start normal Expo server
cd mobile && npx expo start --tunnel           # Start with tunnel (recommended)
cd mobile && npx expo start --localhost        # Start localhost only
```

---

## 🎬 **Demo Ready!**

Once both apps are running:
- **Web**: http://localhost:3001/
- **Mobile**: Scan QR code or use tunnel URL

Both applications are now ready for demo recording! 🚀 