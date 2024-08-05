import type { Config } from "tailwindcss";
import { skeleton } from "@skeletonlabs/tw-plugin";
import { join } from "path";
import forms from "@tailwindcss/forms";

declare var require: any;

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}"
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    skeleton({
      themes: {
        preset: ["skeleton", "wintry"],
      },
    }),
    forms,
  ],
} as Config;
