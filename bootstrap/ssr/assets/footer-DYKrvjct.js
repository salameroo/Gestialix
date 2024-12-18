import { jsxs, jsx } from "react/jsx-runtime";
function Footer({ textDos, text, link }) {
  return /* @__PURE__ */ jsxs("div", { className: "px-12 py-6 bg-gray-50 border-t border-gray-200 flex flex-col justify-between items-center dark:bg-gray-900 ", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-m text-gray-500 mb-2 sm:mb-0", children: [
      textDos,
      /* @__PURE__ */ jsx("a", { href: link, className: "font-medium text-green-600 hover:text-green-500", children: text })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-m text-gray-500 dark:text-white text-center", children: "© 2024 Gestialix. Todos los derechos reservados." })
  ] });
}
export {
  Footer as F
};
