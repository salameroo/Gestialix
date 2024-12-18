import { jsxs, jsx } from "react/jsx-runtime";
import "react";
const TituloPagina = ({ titulo, borderColor = "gray-600" }) => {
  return /* @__PURE__ */ jsxs("div", { className: `relative py-12 mb-4 bg-${borderColor} dark:bg-${borderColor} rounded-lg w-full`, children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-5xl text-center", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 \r\n                                dark:from-teal-400 dark:via-blue-400 dark:to-indigo-400 \r\n                                text-transparent bg-clip-text", children: titulo }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-1  bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 
                            dark:from-teal-400 dark:via-blue-400 dark:to-indigo-400 opacity-75`
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-0.5 
                            bg-gray-200 dark:bg-gray-800 opacity-30 animate-pulse`
      }
    )
  ] });
};
export {
  TituloPagina as T
};
