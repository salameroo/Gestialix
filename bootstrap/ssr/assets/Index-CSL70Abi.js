import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Users, Utensils, DollarSign, Calendar } from "lucide-react";
import "@inertiajs/inertia";
import "./Buttons-D9lSxtz5.js";
import { c as csrfFetch } from "./csrfFetch-DJvw9o1x.js";
import { S as Spinner, A as AppLayout } from "./AppLayout-CWhgbinT.js";
import Chart from "chart.js/auto";
import "framer-motion";
import "@inertiajs/inertia-react";
import "../app.js";
import "axios";
import "@inertiajs/react";
import "react-dom/client";
import "@mui/material/styles/index.js";
import "@mui/material";
import "./apiClient-DgzgG0IP.js";
function StudentRegistrationsChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  let chartInstance = useRef(null);
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await csrfFetch("/api/stats/altasEstudiantes");
        if (!response.ok) throw new Error("Error fetching registration data");
        const data = await response.json();
        const formattedData = data.map((item) => ({
          date: item.date,
          total: item.total
        }));
        setChartData(formattedData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, []);
  useEffect(() => {
    if (chartData.length > 0) {
      renderChart();
    }
  }, [chartData]);
  const renderChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.map((item) => item.date),
        datasets: [
          {
            label: "Estudiantes Registrados",
            data: chartData.map((item) => item.total),
            borderColor: "rgba(59, 130, 246, 1)",
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Registros de Estudiantes"
          }
        }
      }
    });
  };
  if (loading) return /* @__PURE__ */ jsx(Spinner, {});
  if (error) return /* @__PURE__ */ jsxs("p", { children: [
    "Error: ",
    error
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-green-400 mb-4", children: "Registros de Estudiantes" }),
    /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-lg shadow", children: /* @__PURE__ */ jsx("canvas", { ref: chartRef }) })
  ] });
}
function Charts() {
  const [chartData, setChartData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [startDate, setStartDate] = useState(/* @__PURE__ */ new Date());
  const [timeFilter, setTimeFilter] = useState("week");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  let chartInstance = useRef(null);
  const fetchClasses = async () => {
    try {
      const response = await csrfFetch("/api/classes");
      if (!response.ok) throw new Error("Error fetching classes");
      const data = await response.json();
      setClasses(data);
      if (data.length > 0) {
        setSelectedClass(data[0].id);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  const fetchChartData = async () => {
    try {
      setLoading(true);
      const { start: start2, end: end2 } = calculateRange();
      const params = new URLSearchParams();
      if (selectedClass) params.append("class_id", selectedClass);
      if (start2 && end2) {
        params.append("start_date", start2.toISOString().split("T")[0]);
        params.append("end_date", end2.toISOString().split("T")[0]);
      }
      const response = await csrfFetch(`/api/stats/asistencias?${params}`);
      if (!response.ok) throw new Error("Error fetching attendance data");
      const data = await response.json();
      const formattedData = data.map((item) => ({
        day: item.period,
        presentes: item.presentes,
        ausentes: item.ausentes,
        desconocidos: item.desconocidos
      }));
      setChartData(formattedData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const renderChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.map((item) => item.day),
        datasets: [
          {
            label: "Presentes",
            data: chartData.map((item) => item.presentes),
            borderColor: "rgba(52, 211, 153, 1)",
            backgroundColor: "rgba(52, 211, 153, 0.2)",
            tension: 0.4
          },
          {
            label: "Ausentes",
            data: chartData.map((item) => item.ausentes),
            borderColor: "rgba(248, 113, 113, 1)",
            backgroundColor: "rgba(248, 113, 113, 0.2)",
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "Asistencia por Día"
          }
        }
      }
    });
  };
  useEffect(() => {
    fetchClasses();
  }, []);
  useEffect(() => {
    fetchChartData();
  }, [selectedClass, startDate, timeFilter]);
  useEffect(() => {
    if (chartData.length > 0) {
      renderChart();
    }
  }, [chartData]);
  const calculateRange = () => {
    const today = new Date(startDate);
    let start2, end2;
    if (timeFilter === "week") {
      start2 = new Date(today);
      start2.setDate(today.getDate() - today.getDay());
      end2 = new Date(today);
      end2.setDate(today.getDate() + (6 - today.getDay()));
    } else if (timeFilter === "month") {
      start2 = new Date(today.getFullYear(), today.getMonth(), 1);
      end2 = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }
    return { start: start2, end: end2 };
  };
  const changeRange = (direction) => {
    setStartDate((prev) => {
      const newDate = new Date(prev);
      if (timeFilter === "week") {
        newDate.setDate(newDate.getDate() + direction * 7);
      } else if (timeFilter === "month") {
        newDate.setMonth(newDate.getMonth() + direction);
      }
      return newDate;
    });
  };
  if (loading) return /* @__PURE__ */ jsx(Spinner, {});
  if (error) return /* @__PURE__ */ jsxs("p", { children: [
    "Error: ",
    error
  ] });
  const { start, end } = calculateRange();
  return /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
    /* @__PURE__ */ jsxs("h2", { className: "text-lg font-semibold text-gray-700 mb-4 text-green-400", children: [
      "Asistencia por ",
      timeFilter === "week" ? "Semana" : "Mes"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0", children: [
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: timeFilter,
          onChange: (e) => setTimeFilter(e.target.value),
          className: "border dark:text-black rounded-lg p-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500",
          children: [
            /* @__PURE__ */ jsx("option", { value: "week", children: "Semana" }),
            /* @__PURE__ */ jsx("option", { value: "month", children: "Mes" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: selectedClass || "",
          onChange: (e) => setSelectedClass(e.target.value),
          className: "border dark:text-black rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Todas las clases" }),
            classes.map((cls) => /* @__PURE__ */ jsx("option", { value: cls.id, children: cls.nombre }, cls.id))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => changeRange(-1),
          className: "bg-green-200 hover:bg-orange-600 p-2 dark:text-gray-800 rounded",
          children: timeFilter === "week" ? "Semana Anterior" : "Mes Anterior"
        }
      ),
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold", children: [
        start.toLocaleDateString(),
        " - ",
        end.toLocaleDateString()
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => changeRange(1),
          className: "bg-green-200 hover:bg-orange-600 p-2 dark:text-gray-800 rounded",
          children: timeFilter === "week" ? "Semana Siguiente" : "Mes Siguiente"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white p-4 rounded-lg shadow", children: /* @__PURE__ */ jsx("canvas", { ref: chartRef }) })
  ] });
}
const Card = ({ title, value, icon: Icon }) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow p-6 flex items-center", children: [
  /* @__PURE__ */ jsx("div", { className: "rounded-full bg-blue-100 p-3 mr-4", children: /* @__PURE__ */ jsx(Icon, { className: "h-8 w-8 text-blue-500" }) }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-700", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900", children: value })
  ] })
] });
function Dashboard() {
  useState((/* @__PURE__ */ new Date()).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-gray-400", children: /* @__PURE__ */ jsxs("main", { className: "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 md:text-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "px-4 py-6 sm:px-0 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-semibold text-gray-700 dark:text-gray-200", children: "Menu Principal" }),
      /* @__PURE__ */ jsx("br", {})
    ] }),
    /* @__PURE__ */ jsx("hr", { className: "my-6" }),
    /* @__PURE__ */ jsxs("div", { className: "px-4 py-6 sm:px-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsx(Card, { title: "Estudiantes Hoy", value: "180", icon: Users }),
        /* @__PURE__ */ jsx(Card, { title: "Menús Servidos", value: "175", icon: Utensils }),
        /* @__PURE__ */ jsx(Card, { title: "Ingresos Hoy", value: "€540", icon: DollarSign }),
        /* @__PURE__ */ jsx(Card, { title: "Próximo Evento", value: "15 Mayo", icon: Calendar })
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "my-6" }),
      /* @__PURE__ */ jsx(Charts, {}),
      /* @__PURE__ */ jsx(StudentRegistrationsChart, {}),
      /* @__PURE__ */ jsx("hr", { className: "my-6" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-700 mb-4", children: "Menú de Hoy" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Utensils, { className: "h-5 w-5 text-blue-500 mr-2" }),
              /* @__PURE__ */ jsx("span", { children: "Ensalada César" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Utensils, { className: "h-5 w-5 text-blue-500 mr-2" }),
              /* @__PURE__ */ jsx("span", { children: "Pollo al Horno con Patatas" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Utensils, { className: "h-5 w-5 text-blue-500 mr-2" }),
              /* @__PURE__ */ jsx("span", { children: "Fruta de Temporada" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-lg shadow", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-700 mb-4", children: "Próximos Eventos" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5 text-blue-500 mr-2" }),
              /* @__PURE__ */ jsx("span", { children: "15 Mayo - Día de la Nutrición" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5 text-blue-500 mr-2" }),
              /* @__PURE__ */ jsx("span", { children: "22 Mayo - Menú Internacional" })
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5 text-blue-500 mr-2" }),
              /* @__PURE__ */ jsx("span", { children: "1 Junio - Inicio Menú de Verano" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) }) });
}
export {
  Dashboard as default
};
