# ForgeTrack Web

**Live Site:** [https://forgetrack.net](https://forgetrack.net)  
**Frontend Framework:** React + Vite + TypeScript + TailwindCSS  
**Status:** Actively deployed and evolving

---

## 🚀 Overview

**ForgeTrack Web** is the modern frontend interface for the ForgeTrack ERP system—an internal tool built specifically for the steel fabrication industry. This platform tracks jobs, inventory, labor hours, and client data while providing Power BI–style dashboards in a fast, responsive UI.

Designed for use on the shop floor and in project management offices, ForgeTrack Web is connected to a backend API (via Render) and supports real-time KPI updates, Tekla/Access/Excel data integration, and modular expansion.

---

## 🔧 Tech Stack

- **React 18** with **React Router DOM**
- **Vite** for lightning-fast builds
- **TypeScript** for type safety
- **TailwindCSS** for UI utility-first styling
- **Recharts** for KPI cards and data visualization
- **Lucide Icons** for clean modern UI icons

---

## 📦 Installation

```bash
git clone https://github.com/your-username/ForgeTrackWeb.git
cd ForgeTrackWeb
npm install
npm run dev
```

Make sure your backend API is running locally or remotely for full functionality.

---

## 🧱 Project Structure

```
/src
  /components
    Layout.tsx       # Page structure with sidebar
    Sidebar.tsx      # Sidebar navigation
    Dashboard.tsx    # Main dashboard with KPIs and charts
    ...
  /data
    mockData.ts      # Sample KPIs and test job data
  App.tsx            # Main app routes
  index.tsx          # Entry point
```

---

## 📊 Key Features

- Real-time job completion and labor tracking  
- Inventory alerts and usage charts  
- Monthly production graphs and pie charts  
- Responsive dark-mode UI  
- Modular routing system for scaling new features  
- Fully type-safe and optimized for performance

---

## 🧠 Inspiration

Built for use at **Trinity Steel Inc.**, ForgeTrack is a custom ERP solution intended to eventually rival or replace legacy tools like Tekla, StarBuilder, and manual spreadsheet tracking. It combines fabrication shop experience with modern development practices.

---

## 🤝 Contributions Welcome

If you have ideas for new components, UI improvements, or advanced chart integrations—jump in!  
- Fork the repo  
- Create a feature branch  
- Submit a pull request  

Frontend, visualization, and UX contributors are especially welcome.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> _Created and maintained by Michael Hildman, Production Supervisor at Trinity Steel Inc._

