import { ResolveNameParams, defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/swagger-ts";

const nameTransform = (
  name: ResolveNameParams["name"],
  type?: ResolveNameParams["type"]
) => {
  if (type === "file") {
    return (
      name.charAt(0) +
      name.slice(1).replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    ).toLowerCase();
  }

  return name;
};

export default defineConfig(() => {
  return {
    root: ".",
    input: {
      path: "http://185.244.172.108:8081/v2/api-docs",
    },
    output: {
      path: "./src/__generated__",
      clean: true,
    },
    plugins: [
      pluginOas({
        output: false,
      }),
      pluginTs({
        transformers: {
          name: nameTransform,
        },
        group: {
          type: "tag",
          output: "./types/{{tag}}Controller",
        },
      }),
    ],
  };
});
