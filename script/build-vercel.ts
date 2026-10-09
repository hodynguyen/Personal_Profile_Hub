import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, mkdir, cp, writeFile } from "fs/promises";

// Produces a Vercel Build Output API bundle in .vercel/output:
//   static/             -> client build (served by Vercel's CDN)
//   functions/api.func  -> Express API as one serverless function
// https://vercel.com/docs/build-output-api/v3
const out = ".vercel/output";
const funcDir = `${out}/functions/api.func`;

async function buildVercel() {
  await rm(out, { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();
  await mkdir(out, { recursive: true });
  await cp("dist/public", `${out}/static`, { recursive: true });

  console.log("building api function...");
  // Bundle every dependency: the function ships without node_modules
  await esbuild({
    entryPoints: ["server/vercel.ts"],
    platform: "node",
    target: "node22",
    bundle: true,
    format: "cjs",
    outfile: `${funcDir}/index.cjs`,
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    // Optional native addon that pg only tries to load lazily
    external: ["pg-native"],
    // Export the Express app itself as the handler, not { default: app }
    footer: { js: "module.exports = module.exports.default;" },
    minify: true,
    logLevel: "info",
  });

  await writeFile(
    `${funcDir}/.vc-config.json`,
    JSON.stringify(
      {
        runtime: "nodejs24.x",
        handler: "index.cjs",
        launcherType: "Nodejs",
        shouldAddHelpers: false,
      },
      null,
      2,
    ),
  );

  await writeFile(
    `${out}/config.json`,
    JSON.stringify(
      {
        version: 3,
        routes: [
          { src: "^/api(/.*)?$", dest: "/api" },
          { handle: "filesystem" },
          // SPA fallback: let the client router handle everything else
          { src: "/(.*)", dest: "/index.html" },
        ],
      },
      null,
      2,
    ),
  );

  console.log(`done -> ${out}`);
}

buildVercel().catch((err) => {
  console.error(err);
  process.exit(1);
});
