import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
function Logo({ isOpen = true, textPosition = "side" }) {
  const [imageSrc, setImageSrc] = useState("https://gestialix.somontanosocial.com/images/favicon.png");
  const handleError = () => {
    setImageSrc("https://gestialix.somontanosocial.com/images/favicon.png");
  };
  return /* @__PURE__ */ jsx("a", { href: "/", className: "block", children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: `
                    flex items-center justify-center
                    ${textPosition === "side" ? "flex-row space-x-2" : "flex-col space-y-2"}
                `,
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: imageSrc,
            alt: "Gestialix Logo",
            onError: handleError,
            className: "w-10 h-10 md:w-14 md:h-14 object-contain rounded-lg shadow-md"
          }
        ),
        isOpen && /* @__PURE__ */ jsx(
          "h1",
          {
            className: "text-xl md:text-2xl font-bold text-gray-800 dark:text-white tracking-tight",
            children: "Gestialix"
          }
        )
      ]
    }
  ) });
}
export {
  Logo as L
};
