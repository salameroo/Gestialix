import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Search, Sun, Moon, User, ClipboardCheck, Calendar, BookOpen } from "lucide-react";
import { A as AppLayout } from "./AppLayout-CmO9QHft.js";
import { c as csrfFetch } from "./csrfFetch-DJvw9o1x.js";
import { T as TituloPagina } from "./TitlePage-BlITtWYW.js";
import ExportarAsistencias from "./Inicio-i5YDW0Rc.js";
import "@inertiajs/inertia";
import "../app.js";
import "axios";
import "@inertiajs/react";
import "react-dom/client";
import "@mui/material/styles/index.js";
import "@mui/material";
import "./Logo-BY9AhvHn.js";
import "./apiClient-CBG167bR.js";
const DashboardCard = ({ title, value, icon: Icon, color }) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105", children: [
  /* @__PURE__ */ jsx("div", { className: `p-4 rounded-full mb-4 ${color}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-white" }) }),
  /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-700 dark:text-gray-200", children: title }),
  /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: value })
] });
const RecentActivity = ({ activities }) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4", children: "Actividad Reciente" }),
  /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: activities.map((activity, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full" }),
    /* @__PURE__ */ jsxs("p", { className: "flex-1 text-gray-800 dark:text-gray-300", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: activity.action }),
      " - ",
      activity.client
    ] }),
    /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400", children: activity.time })
  ] }, index)) })
] });
const FeatureCard = ({ title, description, icon: Icon, link }) => /* @__PURE__ */ jsxs(
  "a",
  {
    href: link,
    className: "p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:scale-105 group",
    children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors duration-300", children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-indigo-600 dark:text-indigo-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-200" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: description })
    ]
  }
);
const Dashboard = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  const retrieveData = async () => {
    try {
      const response = await csrfFetch(`/api/activities`);
      if (!response.ok) throw new Error("Error al recuperar los datos");
      const data = await response.json();
      setSummaryData(data.summary || []);
      setRecentActivities(data.recentActivities || []);
    } catch (error) {
      console.error("Error al recuperar datos:", error);
    }
  };
  useEffect(() => {
    retrieveData();
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);
  const features = [
    {
      title: "Gestión de Usuarios",
      description: "Administra fácilmente los usuarios de tu sistema.",
      icon: User,
      link: "/clases"
    },
    {
      title: "Asistencias",
      description: "Controla la asistencia de clases y reportes.",
      icon: ClipboardCheck,
      link: "/asistencias"
    },
    {
      title: "Calendario",
      description: "Consulta los eventos y actividades programadas.",
      icon: Calendar,
      link: "/clases"
    },
    {
      title: "Documentación",
      description: "Accede a manuales y tutoriales para ayudarte.",
      icon: BookOpen,
      link: "/terms"
    }
  ];
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center", children: [
      /* @__PURE__ */ jsx(TituloPagina, { titulo: "Panel de Control", borderColor: "transparent" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Buscar...",
              className: "bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
            }
          ),
          /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-gray-500 dark:text-gray-300 absolute left-3 top-2.5" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleDarkMode,
            className: "p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300",
            children: darkMode ? /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto p-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", children: summaryData.map((item, index) => /* @__PURE__ */ jsx(
        DashboardCard,
        {
          title: item.title,
          value: item.value,
          icon: item.icon,
          color: item.color
        },
        index
      )) }),
      /* @__PURE__ */ jsx(RecentActivity, { activities: recentActivities }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800 dark:text-white mb-6", children: "Accesos Rápidos" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: features.map((feature, index) => /* @__PURE__ */ jsx(FeatureCard, { ...feature }, index)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(ExportarAsistencias, {})
  ] }) });
};
export {
  Dashboard as default
};
