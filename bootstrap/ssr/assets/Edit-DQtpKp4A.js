import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { createContext } from "react";
import "@inertiajs/inertia";
import "../app.js";
import { A as AppLayout } from "./AppLayout-CmO9QHft.js";
import "./TextInput-CCgNZyEO.js";
import UpdatePasswordForm from "./UpdatePasswordForm-Ba_w9WZM.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-CexUeXs4.js";
import "axios";
import "react-dom/client";
import "@mui/material/styles/index.js";
import "@mui/material";
import "lucide-react";
import "./Logo-BY9AhvHn.js";
import "./apiClient-CBG167bR.js";
import "./InputError-2JjWc6nJ.js";
import "./InputLabel-DDs2XNYP.js";
import "./PrimaryButton-DDF1xnxF.js";
import "@headlessui/react";
createContext();
function Edit({ mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    AppLayout,
    {
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Perfil" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
