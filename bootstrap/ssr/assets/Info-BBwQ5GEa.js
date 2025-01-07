import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Select, MenuItem, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { T as TituloPagina } from "./TitlePage-BlITtWYW.js";
import { A as AppLayout } from "./AppLayout-CmO9QHft.js";
import "@inertiajs/inertia";
import "lucide-react";
import "../app.js";
import "axios";
import "@inertiajs/react";
import "react-dom/client";
import "@mui/material/styles/index.js";
import "./Logo-BY9AhvHn.js";
import "./apiClient-CBG167bR.js";
const obtenerClases = async () => {
  const response = await fetch("/api/info/clasees");
  const data = await response.json();
  return data.map(({ id, nombre }) => ({ id, nombre }));
};
const obtenerAlumnos = async (claseId, mes) => {
  const response = await fetch(`/api/info/alumnos?clase_id=${claseId}&mes=${mes}`);
  if (!response.ok) throw new Error("Error al obtener alumnos");
  return await response.json();
};
function Cuadricula() {
  const [claseSeleccionada, setClaseSeleccionada] = useState("");
  const [mesSeleccionado, setMesSeleccionado] = useState((/* @__PURE__ */ new Date()).getMonth());
  const [clases, setClases] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  useEffect(() => {
    const cargarClases = async () => {
      const clasesDisponibles = await obtenerClases();
      setClases(clasesDisponibles);
      if (clasesDisponibles.length > 0) {
        setClaseSeleccionada(clasesDisponibles[0].id);
      }
    };
    cargarClases();
  }, []);
  useEffect(() => {
    const cargarAlumnos = async () => {
      if (claseSeleccionada) {
        const response = await obtenerAlumnos(claseSeleccionada, mesSeleccionado + 1);
        if (response.message) {
          setAlumnos([]);
          setMensaje(response.message);
        } else {
          setAlumnos(response);
          setMensaje("");
        }
      }
    };
    cargarAlumnos();
  }, [claseSeleccionada, mesSeleccionado]);
  const diasEnMes = new Date((/* @__PURE__ */ new Date()).getFullYear(), mesSeleccionado + 1, 0).getDate();
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto ", children: [
    /* @__PURE__ */ jsx(TituloPagina, { titulo: "Registro de Comedor", borderColor: "blue" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4", children: [
      /* @__PURE__ */ jsx(
        Select,
        {
          value: claseSeleccionada,
          onChange: (e) => setClaseSeleccionada(e.target.value),
          className: "bg-white dark:bg-gray-700 w-full md:w-auto",
          children: clases.map((clase) => /* @__PURE__ */ jsx(MenuItem, { value: clase.id, children: clase.nombre }, clase.id))
        }
      ),
      /* @__PURE__ */ jsx(
        Select,
        {
          value: mesSeleccionado,
          onChange: (e) => setMesSeleccionado(e.target.value),
          className: "bg-white dark:bg-gray-700 w-full md:w-auto",
          children: [...Array(12)].map((_, i) => /* @__PURE__ */ jsx(MenuItem, { value: i, children: new Date(0, i).toLocaleString("default", { month: "long" }) }, i))
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { children: mensaje ? /* @__PURE__ */ jsx("div", { className: "text-center text-gray-500", children: mensaje }) : /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
      TableContainer,
      {
        component: Paper,
        className: "shadow-md rounded-lg overflow-x-auto max-w-full",
        children: /* @__PURE__ */ jsxs(Table, { className: "border-collapse border border-gray-200 dark:border-gray-700 w-full min-w-max", children: [
          /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-gray-100 dark:bg-gray-800", children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-bold text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700", children: "Alumno" }),
            [...Array(diasEnMes)].map((_, dia) => /* @__PURE__ */ jsx(
              TableCell,
              {
                align: "center",
                className: "font-bold text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700",
                children: dia + 1
              },
              dia
            ))
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: alumnos.length > 0 ? alumnos.map((alumno) => /* @__PURE__ */ jsxs(
            TableRow,
            {
              className: "hover:bg-gray-50 dark:hover:bg-gray-800",
              children: [
                /* @__PURE__ */ jsx(
                  TableCell,
                  {
                    component: "th",
                    scope: "row",
                    className: "text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 px-4 md:px-12",
                    children: alumno.nombre
                  }
                ),
                alumno.diasComedor.map((diaData, dia) => /* @__PURE__ */ jsx(
                  TableCell,
                  {
                    align: "center",
                    className: `w-8 h-8 text-sm md:font-bold md:text-base border border-gray-200 dark:border-gray-700
                                                    ${diaData === "✓" ? "bg-lime-700 hover:bg-lime-950 dark:bg-lime-500 hover:text-white dark:hover:bg-lime-600" : diaData === "✗" ? "bg-red-600 hover:bg-red-950 dark:bg-red-400 hover:text-white dark:hover:bg-red-500" : diaData === "O" ? "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-400 dark:hover:bg-yellow-500" : "bg-sky-100 hover:bg-sky-600 dark:bg-neutral-400 dark:text-sky-700 dark:hover:text-white hover:text-white dark:hover:bg-sky-500"}`,
                    children: diaData
                  },
                  dia
                ))
              ]
            },
            alumno.id
          )) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
            TableCell,
            {
              colSpan: diasEnMes + 1,
              align: "center",
              className: "text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700",
              children: "No hay datos disponibles"
            }
          ) }) })
        ] })
      }
    ) }) })
  ] });
}
function Home() {
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx(Cuadricula, {}) });
}
export {
  Home as default
};
