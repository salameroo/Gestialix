import { jsx, jsxs } from "react/jsx-runtime";
import axios from "axios";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { createContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider as ThemeProvider$1 } from "@mui/material/styles/index.js";
import { CssBaseline } from "@mui/material";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
if (csrfToken) {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
} else {
  console.error("CSRF token not found. Check your Blade template.");
}
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#9c27b0"
    }
  }
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9"
    },
    secondary: {
      main: "#f48fb1"
    },
    background: {
      default: "#1f2021",
      paper: "#1e1e1e"
    }
  }
});
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  const toggleTheme = () => setDarkMode((prev) => !prev);
  const muiTheme = darkMode ? darkTheme : lightTheme;
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { darkMode, toggleTheme }, children: /* @__PURE__ */ jsxs(ThemeProvider$1, { theme: muiTheme, children: [
    /* @__PURE__ */ jsx(CssBaseline, {}),
    children
  ] }) });
};
const appName = "Laravel";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.jsx`,
    /* @__PURE__ */ Object.assign({ "./Pages/Admin/Dashboard.jsx": () => import("./assets/Dashboard-Ck5wKdMJ.js"), "./Pages/Admin/Users/Edit.jsx": () => import("./assets/Edit-CWlwUTDU.js"), "./Pages/Admin/Users/Index.jsx": () => import("./assets/Index-D4bcYvAD.js"), "./Pages/AsistenciasManagement/AttendanceCrud.jsx": () => import("./assets/AttendanceCrud-CJzw3h6X.js"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-Bj-_YScQ.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-HxouYiX6.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-dg6TeUtq.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-BTVk-nvc.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-Dknqzobj.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-CgCd1-Bq.js"), "./Pages/ClasesManagement/Clases.jsx": () => import("./assets/Clases-B9IxCACL.js"), "./Pages/Dashboard/Index.jsx": () => import("./assets/Index-CK1dU5Gt.js"), "./Pages/Index.jsx": () => import("./assets/Index-K35jCgjS.js"), "./Pages/Info/Info.jsx": () => import("./assets/Info-B6i18eW2.js"), "./Pages/Inicio/Inicio.jsx": () => import("./assets/Inicio-DeIBrIh8.js"), "./Pages/Menus/Create.jsx": () => import("./assets/Create-Q5XJF23l.js"), "./Pages/Menus/Edit.jsx": () => import("./assets/Edit-DQzCA2ju.js"), "./Pages/Menus/Index.jsx": () => import("./assets/Index-Bey5-MEC.js"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-B4A4pvle.js"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-D2xBGxMS.js"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-Ba_w9WZM.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-CexUeXs4.js"), "./Pages/Settings/Ajustes.jsx": () => import("./assets/Ajustes-q5fUQff2.js"), "./Pages/Terminos/Terminos.jsx": () => import("./assets/Terminos-CcIwL_qt.js"), "./Pages/Terminos/Terms.jsx": () => import("./assets/Terms-Dgsv8H_p.js"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-BEma1mDR.js"), "./Pages/baks/CopyWelcome.jsx": () => import("./assets/CopyWelcome-ByNhCfvu.js"), "./Pages/baks/Landing.jsx": () => import("./assets/Landing-BPr_XzFQ.js"), "./Pages/baks/ListaComedor.jsx": () => import("./assets/ListaComedor-Zk6gLoCE.js"), "./Pages/baks/Navbar.jsx": () => import("./assets/Navbar-Uc6k5Mhu.js"), "./Pages/baks/TwoFactorAuthentication.jsx": () => import("./assets/TwoFactorAuthentication-DPOgaFwR.js") })
  ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(App, { ...props }) })
    );
  },
  progress: {
    color: "#4B5563"
  }
});
export {
  ThemeContext as T
};
