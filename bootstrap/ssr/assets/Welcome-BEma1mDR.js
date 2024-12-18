import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Users, Utensils, Check } from "lucide-react";
import { B as Button } from "./Buttons-4ar7zDL-.js";
import { F as Footer } from "./footer-DYKrvjct.js";
import { L as Logo } from "./Logo-BY9AhvHn.js";
import { Head } from "@inertiajs/react";
import { T as ThemeContext } from "../app.js";
import "@inertiajs/inertia-react";
import "axios";
import "react-dom/client";
import "@mui/material/styles/index.js";
import "@mui/material";
function WordSlider({ words, interval = 3e3 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(wordInterval);
  }, [words, interval]);
  return /* @__PURE__ */ jsx("div", { className: "relative h-16 overflow-hidden text-4xl font-bold text-center text-orange-500", children: words.map((word, index) => /* @__PURE__ */ jsx(
    "span",
    {
      className: `absolute transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`,
      style: {
        transform: `translateY(${index === currentIndex ? 0 : -100}%)`,
        position: "absolute",
        left: "0",
        right: "0"
      },
      children: word
    },
    index
  )) });
}
function LandingPage(auth, laravelVersion, phpVersion) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 flex flex-col", children: [
    /* @__PURE__ */ jsx(Head, { title: "Bienvenida" }),
    /* @__PURE__ */ jsx("header", { className: "bg-white shadow-md dark:bg-gray-900", children: /* @__PURE__ */ jsx(
      "nav",
      {
        className: "container mx-auto px-4 sm:px-6 lg:px-8",
        "aria-label": "Navegación principal",
        children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Logo, {}),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Gestialix - Plataforma de Gestión Escolar" })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "-mx-3 flex flex-1 justify-end", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 sm:space-x-6", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/login",
                className: "text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-300",
                "aria-label": "Iniciar sesión",
                children: "Iniciar sesión"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                link: "/register",
                text: "Regístrate",
                "aria-label": "Registrarse"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: toggleTheme,
                className: "p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-500",
                "aria-label": darkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro",
                children: darkMode ? /* @__PURE__ */ jsx(Sun, { className: "w-6 h-6 text-yellow-500" }) : /* @__PURE__ */ jsx(Moon, { className: "w-6 h-6 text-blue-500" })
              }
            )
          ] }) })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "relative bg-gradient-to-r from-green-600 to-blue-500 dark:from-gray-700 dark:to-gray-800 py-16 sm:py-24 text-white text-center",
          initial: { opacity: 0, y: 50 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1 },
          children: [
            /* @__PURE__ */ jsxs(
              "h1",
              {
                className: "text-4xl sm:text-5xl sm:p-0 p-2 md:text-6xl font-extrabold",
                tabIndex: 0,
                children: [
                  "Simplifica la Gestión de tu",
                  " ",
                  /* @__PURE__ */ jsx(
                    WordSlider,
                    {
                      words: ["Colegio", "Instituto", "Universidad", "Comedor"],
                      interval: 3e3
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "mt-4 text-lg p-2 sm:p-0 sm:text-xl max-w-2xl mx-auto",
                tabIndex: 0,
                children: "Una plataforma intuitiva y eficiente para organizar clases, gestionar estudiantes y generar informes para optimizar los recursos de tu comedor."
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-center space-x-4", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  link: "/",
                  text: "Solicita una demo",
                  "aria-label": "Solicitar una demo"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  link: "/",
                  text: "Ver Más",
                  variant: "outline",
                  "aria-label": "Ver más información"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "py-16 bg-white dark:bg-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "text-3xl font-extrabold text-gray-900 dark:text-gray-100",
            tabIndex: 0,
            "aria-labelledby": "features-title",
            id: "features-title",
            children: "Todo lo que necesitas para tu comedor"
          }
        ),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "mt-4 text-lg text-gray-600 dark:text-gray-400",
            tabIndex: 0,
            "aria-describedby": "features-title",
            children: "Desde el control de asistencia hasta la planificación de menús, Gestialix tiene todo cubierto."
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
            role: "list",
            children: [
              {
                icon: Users,
                title: "Control de Estudiantes",
                description: "Administra fácilmente la información de tus estudiantes y sus necesidades específicas."
              },
              {
                icon: Utensils,
                title: "Planificación de Menús",
                description: "Consulta menús balanceados considerando intolerancias y preferencias alimenticias."
              },
              {
                icon: Check,
                title: "Generación de Informes",
                description: "Obtén reportes mensuales detallados listos para enviar a las autoridades educativas."
              }
            ].map((feature, index) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "p-6 bg-gray-50 rounded-lg shadow flex flex-col items-center text-center dark:bg-gray-800",
                tabIndex: 0,
                role: "listitem",
                "aria-labelledby": `feature-title-${index}`,
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "flex justify-center items-center h-12 w-12 bg-green-700 text-white rounded-full dark:bg-green-600",
                      "aria-hidden": "true",
                      children: /* @__PURE__ */ jsx(feature.icon, { className: "w-6 h-6" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "h3",
                    {
                      className: "mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100",
                      id: `feature-title-${index}`,
                      children: feature.title
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-600 dark:text-gray-400", children: feature.description })
                ]
              },
              index
            ))
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs(
        "section",
        {
          className: "bg-gradient-to-r from-green-700 to-green-500 dark:bg-gradient-to-l  dark:from-gray-800 dark:to-gray-600 py-16 text-center text-white",
          "aria-labelledby": "cta-title",
          children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                className: "text-3xl sm:text-4xl font-extrabold text-white",
                id: "cta-title",
                tabIndex: 0,
                children: "¿Listo para transformar la gestión de tu comedor?"
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "mt-4 text-lg p-2 sm:p-0 sm:text-xl max-w-2xl mx-auto text-white",
                tabIndex: 0,
                "aria-describedby": "cta-title",
                children: "Comienza a usar Gestialix hoy mismo y simplifica tus operaciones como nunca antes."
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "mt-8 flex justify-center space-x-4", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  text: "Solicita una demo",
                  link: "/demo",
                  ariaLabel: "Solicitar una demostración",
                  className: "bg-green-700 hover:bg-green-800 text-white"
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  text: "Cerrar sesión",
                  link: "/logout",
                  ariaLabel: "Cerrar la sesión actual",
                  className: "bg-red-700 hover:bg-red-800 text-white"
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  LandingPage as default
};
