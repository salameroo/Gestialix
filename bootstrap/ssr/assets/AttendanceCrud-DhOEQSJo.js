import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { S as Spinner, A as AppLayout } from "./AppLayout-CWhgbinT.js";
import { ChevronLeft, Calendar, ChevronRight, Users, Search, Eye, Check, X, User, Star, UserX } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { c as csrfFetch } from "./csrfFetch-DJvw9o1x.js";
import { Dialog, DialogTitle, DialogContent, Checkbox, DialogActions, Button, IconButton, Typography, Box, Chip } from "@mui/material";
import { Close } from "@mui/icons-material";
import "@inertiajs/inertia";
import "../app.js";
import "axios";
import "@inertiajs/react";
import "react-dom/client";
import "@mui/material/styles/index.js";
import "./apiClient-DgzgG0IP.js";
registerLocale("es", es);
const DataSelector = ({ currentDay, changeDate, handleDayChange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    handleDayChange(formattedDate);
    setIsCalendarOpen(false);
  };
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => changeDate(-1),
        className: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700",
        children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6 text-gray-700 dark:text-gray-300" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center space-x-2 cursor-pointer",
          onClick: () => setIsCalendarOpen((prev) => !prev),
          children: [
            /* @__PURE__ */ jsx(Calendar, { className: "text-blue-500 dark:text-blue-400" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800 dark:text-gray-200", children: new Date(currentDay).toLocaleDateString("es-ES") })
          ]
        }
      ),
      isCalendarOpen && /* @__PURE__ */ jsx("div", { className: "absolute mt-2 z-50", children: /* @__PURE__ */ jsx(
        DatePicker,
        {
          selected: new Date(currentDay),
          onChange: handleDateChange,
          inline: true,
          filterDate: isWeekday,
          locale: "es",
          className: "react-datepicker"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => changeDate(1),
        className: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700",
        children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6 text-gray-700 dark:text-gray-300" })
      }
    )
  ] });
};
function OccasionalStudents({ occasionalStudents, closeModal, addStudents }) {
  const [selectedOccasionals, setSelectedOccasionals] = useState([]);
  const handleToggleStudentSelection = (studentId) => {
    setSelectedOccasionals(
      (prev) => prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };
  const handleSaveOccasionalStudents = () => {
    const selectedStudents = occasionalStudents.filter(
      (student) => selectedOccasionals.includes(student.id)
    );
    addStudents(selectedStudents);
    closeModal();
  };
  return /* @__PURE__ */ jsxs(Dialog, { open: true, fullWidth: true, maxWidth: "sm", children: [
    /* @__PURE__ */ jsx(DialogTitle, { children: "Estudiantes no asignados al comedor" }),
    /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsx("ul", { className: "divide-y divide-gray-200 dark:divide-gray-700", children: occasionalStudents.map((student) => /* @__PURE__ */ jsx("li", { className: "py-2 flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsx(
        Checkbox,
        {
          checked: selectedOccasionals.includes(student.id),
          onChange: () => handleToggleStudentSelection(student.id)
        }
      ),
      /* @__PURE__ */ jsxs("span", { children: [
        student.nombre,
        " ",
        student.apellidos
      ] })
    ] }) }, student.id)) }) }),
    /* @__PURE__ */ jsxs(DialogActions, { children: [
      /* @__PURE__ */ jsx(Button, { className: "dark:bg-red-400 dark:hover:bg-red-500 dark:text-white", onClick: closeModal, color: "error", variant: "outlined", children: "Cancelar" }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleSaveOccasionalStudents,
          color: "primary",
          variant: "contained",
          className: "dark:bg-blue-400 dark:hover:bg-blue-500 dark:text-white",
          children: "Guardar"
        }
      )
    ] })
  ] });
}
function StudentIntolerancesModal({ isOpen, onClose, student }) {
  if (!student) return null;
  const intolerances = student.intolerancia_religion ? JSON.parse(student.intolerancia_religion) : [];
  return /* @__PURE__ */ jsxs(
    Dialog,
    {
      open: isOpen,
      onClose,
      fullWidth: true,
      maxWidth: "sm",
      sx: {
        "& .MuiDialog-paper": {
          borderRadius: 4,
          padding: 2,
          bgcolor: "background.paper"
        }
      },
      children: [
        /* @__PURE__ */ jsxs(DialogTitle, { children: [
          "Intolerancias de ",
          student.nombre,
          /* @__PURE__ */ jsx(
            IconButton,
            {
              "aria-label": "close",
              onClick: onClose,
              sx: {
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              },
              children: /* @__PURE__ */ jsx(Close, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(DialogContent, { dividers: true, children: [
          /* @__PURE__ */ jsx(
            Typography,
            {
              variant: "body2",
              color: "textSecondary",
              sx: { mb: 2 },
              children: "Estas son las intolerancias registradas para este estudiante:"
            }
          ),
          intolerances.length > 0 ? /* @__PURE__ */ jsx(Box, { sx: { display: "flex", flexWrap: "wrap", gap: 1 }, children: intolerances.map((intolerancia, index) => /* @__PURE__ */ jsx(
            Chip,
            {
              label: intolerancia,
              color: "error",
              variant: "outlined",
              sx: {
                fontWeight: "bold",
                color: "white",
                bgcolor: (theme) => theme.palette.error.main
              }
            },
            index
          )) }) : /* @__PURE__ */ jsx(Typography, { variant: "body2", color: "textSecondary", children: "Este estudiante no tiene intolerancias registradas." })
        ] }),
        /* @__PURE__ */ jsx(DialogActions, { children: /* @__PURE__ */ jsx(Button, { onClick: onClose, color: "primary", variant: "contained", children: "Cerrar" }) })
      ]
    }
  );
}
function Asistencia() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [currentDay, setCurrentDay] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOccasionalModalOpen, setIsOccasionalModalOpen] = useState(false);
  const [occasionalStudents, setOccasionalStudents] = useState([]);
  useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [occasionalStudentsFromDB, setOccasionalStudentsFromDB] = useState([]);
  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchInitialData = async () => {
      var _a, _b;
      try {
        setLoading(true);
        console.log("Fetching classes...");
        const classResponse = await csrfFetch("/api/classes");
        if (!classResponse.ok) throw new Error("Error fetching classes");
        const classData = await classResponse.json();
        console.log("Clases Traídas:", classData);
        setClasses(classData);
        setSelectedClass(((_a = classData[0]) == null ? void 0 : _a.id) || null);
        if ((_b = classData[0]) == null ? void 0 : _b.id) {
          await fetchAttendanceData(currentDay, classData[0].id);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, [currentDay]);
  const fetchOccasionalStudents = async (date, classId) => {
    try {
      const response = await csrfFetch(`/api/ocasionales/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha: date, clase_id: classId })
      });
      if (!response.ok) throw new Error("Error al obtener los estudiantes ocasionales");
      const data = await response.json();
      console.log("Estudiantes ocasionales:", data);
      setOccasionalStudentsFromDB(data);
    } catch (err) {
      console.error(err);
      alert("Hubo un problema al cargar los estudiantes ocasionales.");
    }
  };
  useEffect(() => {
    if (selectedClass && currentDay) {
      fetchOccasionalStudents(currentDay, selectedClass);
    }
  }, [selectedClass, currentDay]);
  const fetchAttendanceData = async (date, classId) => {
    try {
      setLoading(true);
      const response = await csrfFetch(`/api/attendance-or-create?date=${date}&class_id=${classId}`);
      if (!response.ok) throw new Error("Error fetching attendance data");
      const data = await response.json();
      const updatedData = data.map((record) => ({
        ...record,
        asiste: record.asiste !== null ? record.asiste : 1,
        esOcasional: record.es_dia_suelto === 1
        // Determina si es ocasional
      }));
      setAttendanceData(updatedData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleAttendanceChange = async (attendanceId, newStatus) => {
    try {
      const response = await csrfFetch(`/api/attendance/${attendanceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ asiste: newStatus })
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setAttendanceData(
        (prevData) => prevData.map(
          (record) => record.id === attendanceId ? { ...record, asiste: newStatus } : record
        )
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  const handleDayChange = async (newDate) => {
    if (!selectedClass) {
      console.warn("Selecciona una clase primero.");
      return;
    }
    setCurrentDay(newDate);
    setLoading(true);
    try {
      const response = await csrfFetch(`/api/attendance-or-create?date=${newDate}&class_id=${selectedClass}`);
      if (!response.ok) throw new Error("Error fetching attendance data");
      const data = await response.json();
      setAttendanceData(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const filteredStudents = attendanceData.filter(
    (record) => record.estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || record.estudiante.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const changeDate = (days) => {
    let newDate = new Date(currentDay);
    do {
      newDate.setDate(newDate.getDate() + days);
    } while (newDate.getDay() === 0 || newDate.getDay() === 6);
    handleDayChange(newDate.toISOString().split("T")[0]);
  };
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  if (loading) return /* @__PURE__ */ jsx(
    Spinner,
    {
      color: "green",
      size: "lg"
    }
  );
  if (error) return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative", role: "alert", children: [
    /* @__PURE__ */ jsx("strong", { className: "font-bold", children: "Error:" }),
    /* @__PURE__ */ jsxs("span", { className: "block sm:inline", children: [
      " ",
      error
    ] })
  ] }) });
  const handleClassChange = async (classId) => {
    try {
      setSelectedClass(Number(classId));
      await fetchAttendanceData(currentDay, Number(classId));
    } catch (err) {
      console.error("Error al cambiar de clase:", err);
    }
  };
  const openOccasionalModal = () => {
    if (!selectedClass) {
      alert("Por favor, selecciona una clase primero.");
      return;
    }
    const classData = classes.find((cls) => cls.id === Number(selectedClass));
    if (!classData) {
      console.error("Clase seleccionada no encontrada.");
      alert("Clase no encontrada.");
      return;
    }
    const estudiantes = classData.estudiantes || [];
    if (estudiantes.length === 0) {
      console.error("No hay estudiantes en esta clase.");
      alert("No se encontraron estudiantes para esta clase.");
      return;
    }
    console.log("Clase seleccionada:", classData);
    if (!Array.isArray(occasionalStudentsFromDB)) {
      console.error("occasionalStudentsFromDB no es un array:", occasionalStudentsFromDB);
      alert("Error al cargar los datos de estudiantes ocasionales.");
      return;
    }
    const assignedIds = new Set(occasionalStudentsFromDB.map((oc) => oc.estudiante_id));
    console.log("IDs de estudiantes ocasionales:", assignedIds);
    const notAssignedStudents = estudiantes.filter(
      (student) => !student.asignado_comedor && !assignedIds.has(student.id)
    );
    console.log("Estudiantes no asignados al comedor:", notAssignedStudents);
    setOccasionalStudents(notAssignedStudents);
    setIsOccasionalModalOpen(true);
  };
  const addOccasionalStudents = async (occasionalStudents2, classId) => {
    try {
      const responses = await Promise.all(occasionalStudents2.map(
        (student) => csrfFetch("/api/ocasionales", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            estudiante_id: student.id,
            clase_id: classId,
            fecha: currentDay
            // Fecha seleccionada
          })
        })
      ));
      fetchOccasionalStudents(currentDay, classId);
      alert("Estudiantes ocasionales asignados para el día.");
    } catch (error2) {
      console.error("Error al asignar estudiantes ocasionales:", error2);
      alert("Hubo un problema al asignar estudiantes ocasionales.");
    }
  };
  const handleUnassignOccasional = async (studentId) => {
    if (!selectedClass) {
      alert("Por favor, selecciona una clase primero.");
      return;
    }
    const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    try {
      const response = await csrfFetch(`/api/ocasionales/${studentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          estudiante_id: studentId,
          fecha: currentDate
          // Pasar la fecha actual
        })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al desasignar: ${errorText}`);
      }
      setOccasionalStudentsFromDB(
        (prev) => prev.filter(
          (student) => !(student.estudiante_id === studentId && student.fecha === currentDate)
        )
      );
      alert("Estudiante ocasional desasignado correctamente para hoy.");
    } catch (err) {
      console.error("Error al desasignar estudiante ocasional:", err);
      alert("Hubo un problema al desasignar al estudiante ocasional.");
    }
  };
  const closeOccasionalModal = () => {
    setIsOccasionalModalOpen(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900 p-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200", children: "Asistencia al Comedor" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
            /* @__PURE__ */ jsx(Users, { className: "text-blue-500 dark:text-blue-400" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: selectedClass || "",
                onChange: (e) => handleClassChange(e.target.value),
                className: "border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Selecciona una clase" }),
                  classes.map((cls) => /* @__PURE__ */ jsx("option", { value: cls.id, children: cls.nombre }, cls.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            DataSelector,
            {
              currentDay,
              changeDate,
              handleDayChange
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-auto", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Buscar estudiante...",
                className: "pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto", children: [
          /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 dark:bg-gray-700", children: [
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Alumno" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Intolerancia / Alergia" }),
              /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Asistencia" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: filteredStudents.map((record) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200", children: [
                /* @__PURE__ */ jsx("span", { className: "block sm:hidden", children: truncateText(`${record.estudiante.nombre} ${record.estudiante.apellidos}`, 16) }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: truncateText(`${record.estudiante.nombre} ${record.estudiante.apellidos}`, 40) })
              ] }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleOpenModal(record.estudiante),
                  className: `p-2 rounded-full transition-colors ${record.estudiante.intolerancia_religion && JSON.parse(record.estudiante.intolerancia_religion).length > 0 ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`,
                  disabled: !record.estudiante.intolerancia_religion || JSON.parse(record.estudiante.intolerancia_religion).length === 0,
                  children: /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" })
                }
              ) }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleAttendanceChange(record.id, 1),
                    className: `p-2 rounded-full transition-colors ${record.asiste === 1 ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-green-100 dark:bg-gray-700 dark:hover:bg-green-600"}`,
                    children: /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleAttendanceChange(record.id, 0),
                    className: `p-2 rounded-full transition-colors ${record.asiste === 0 ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-600"}`,
                    children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }) })
            ] }, record.id)) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-4", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: openOccasionalModal,
              className: "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition",
              children: "Seleccionar Alumno Ocasional"
            }
          ) }),
          occasionalStudentsFromDB.length > 0 && /* @__PURE__ */ jsx("div", { className: "w-full overflow-x-auto shadow-md sm:rounded-lg mt-4", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left text-gray-500 dark:text-gray-400", children: [
            /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Alumno" }),
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Tipo" }),
              /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3 text-right", children: "Acción" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: occasionalStudentsFromDB && occasionalStudentsFromDB.map((student) => /* @__PURE__ */ jsxs(
              "tr",
              {
                className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600",
                children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                    /* @__PURE__ */ jsx(User, { className: "h-5 w-5 text-gray-500 dark:text-gray-300" }),
                    /* @__PURE__ */ jsxs("span", { className: "text-gray-800 dark:text-gray-200", children: [
                      student.nombre,
                      " ",
                      student.apellidos
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 text-yellow-500 dark:text-yellow-300" }),
                    /* @__PURE__ */ jsx("span", { className: "font-semibold text-yellow-600 dark:text-yellow-400", children: "Ocasional" })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => handleUnassignOccasional(student.estudiante_id),
                      className: "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 dark:focus:ring-red-500",
                      children: [
                        /* @__PURE__ */ jsx(UserX, { className: "h-4 w-4 mr-2" }),
                        "Desasignar"
                      ]
                    }
                  ) })
                ]
              },
              student.estudiante_id
            )) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200", children: "Resumen de Asistencia" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-green-100 dark:bg-green-800 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-green-800 dark:text-green-300 font-medium", children: "Presentes" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: attendanceData.filter((record) => record.asiste === 1).length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-red-100 dark:bg-red-800 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-red-800 dark:text-red-300 font-medium", children: "Ausentes" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-red-600 dark:text-red-400", children: attendanceData.filter((record) => record.asiste === 0).length })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg", children: [
            /* @__PURE__ */ jsx("p", { className: "text-yellow-800 dark:text-yellow-300 font-medium", children: "Ocasional" }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-yellow-600 dark:text-yellow-400", children: attendanceData.filter((record) => record.esOcasional === true).length })
          ] })
        ] })
      ] })
    ] }),
    selectedStudent && /* @__PURE__ */ jsx(
      StudentIntolerancesModal,
      {
        isOpen: isModalOpen,
        onClose: handleCloseModal,
        student: selectedStudent
      }
    ),
    isOccasionalModalOpen && /* @__PURE__ */ jsx(
      OccasionalStudents,
      {
        occasionalStudents,
        closeModal: closeOccasionalModal,
        addStudents: (students) => addOccasionalStudents(students, selectedClass)
      }
    )
  ] });
}
function ComedorAttendance() {
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx(Asistencia, {}) });
}
export {
  ComedorAttendance as default
};
