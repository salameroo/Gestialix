import { jsx } from "react/jsx-runtime";
import "react";
const ExportarAsistencias = () => {
  const handleExport = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/exportar-asistencias", {
        method: "GET"
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "relacion_vales_comedor.xlsx");
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Error al descargar el archivo");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return /* @__PURE__ */ jsx("div", { style: { textAlign: "center", marginTop: "20px" }, children: /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleExport,
      style: {
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px"
      },
      children: "Exportar Relación de Vales"
    }
  ) });
};
export {
  ExportarAsistencias as default
};
