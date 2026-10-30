import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { projects } from "@/content/projects";

import { App } from "./App";

beforeEach(() => {
  document.documentElement.lang = "es";
  document.documentElement.setAttribute("data-theme", "light");
});

describe("App", () => {
  it("shows the name, every section and every project", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Juan Antonio León Ojeda" }),
    ).toBeInTheDocument();
    for (const name of ["Proyectos", "Trayectoria", "Stack", "Hablemos"]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
    for (const project of projects) {
      expect(screen.getByRole("heading", { level: 3, name: project.name })).toBeInTheDocument();
    }
  });

  it("links the header to each section", () => {
    render(<App />);
    const nav = screen.getByRole("navigation", { name: "Secciones" });
    const targets = within(nav)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));
    expect(targets).toEqual(["#projects", "#career", "#stack", "#contact"]);
    for (const target of targets) {
      expect(document.querySelector(target ?? "")).not.toBeNull();
    }
  });

  it("switches to English and remembers it", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "English" }));

    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("portfolio-idioma")).toBe("en");
    expect(screen.getByRole("heading", { level: 2, name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles the theme and names the next action", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Cambiar a tema oscuro" }));

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Cambiar a tema claro" })).toBeInTheDocument();
  });

  it("links every public repository and website, in a new tab", () => {
    render(<App />);
    const hrefs = projects.flatMap((project) => [
      ...(project.code ?? []).map((link) => link.href),
      ...(project.site === undefined ? [] : [project.site]),
    ]);
    for (const href of hrefs) {
      const link = document.querySelector(`a[href="${href}"]`);
      expect(link, href).not.toBeNull();
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("says when a project's code is private", () => {
    render(<App />);
    const privateCount = projects.filter((project) => (project.code ?? []).length === 0).length;
    expect(screen.getAllByText("Repositorio privado")).toHaveLength(privateCount);
  });

  it("shows a preview only for projects that have one", () => {
    render(<App />);
    const images = screen.queryAllByRole("img");
    expect(images).toHaveLength(projects.filter((project) => project.preview !== undefined).length);
  });

  it("keeps a placeholder for every missing preview and website", () => {
    render(<App />);
    const withoutPreview = projects.filter((project) => project.preview === undefined).length;
    const withoutSite = projects.filter((project) => project.site === undefined).length;
    expect(screen.queryAllByText("Vista previa próximamente")).toHaveLength(withoutPreview);
    const sitePlaceholders = screen.queryAllByText("Web próximamente");
    expect(sitePlaceholders).toHaveLength(withoutSite);
    for (const placeholder of sitePlaceholders) {
      expect(placeholder.closest("a")).toBeNull();
    }
  });
});
