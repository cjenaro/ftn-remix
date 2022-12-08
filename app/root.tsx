import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import globalCSS from "~/styles/global.css";
import Header from "./components/header";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Formulario Terapéutico Nacional",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  {
    href: "https://unpkg.com/open-props/normalize.min.css",
    rel: "stylesheet",
  },
  {
    href: "https://unpkg.com/open-props",
    rel: "stylesheet",
  },
  {
    href: globalCSS,
    rel: "stylesheet",
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
