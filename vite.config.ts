import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import presetUno from "@unocss/preset-uno";
import { presetTypography } from "@unocss/preset-typography";
import presetWebFonts from "@unocss/preset-web-fonts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [
        presetUno({
          dark: "media",
        }),
        presetTypography(),
        presetWebFonts({
          provider: "fontshare",
          fonts: {
            sans: "Red Hat Display",
          },
        }),
      ],
    }),
    react(),
  ],
});
