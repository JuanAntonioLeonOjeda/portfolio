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

  it("shows each project folded: tag, name, short description and main technologies", () => {
    render(<App />);
    for (const project of projects) {
      const card = screen.getByRole("button", { name: project.name });
      expect(card).toHaveAttribute("aria-expanded", "false");
      const article = card.closest("article");
      expect(article).not.toBeNull();
      expect(article).toHaveTextContent(project.tag.es);
      expect(article).toHaveTextContent(project.tagline.es);
      for (const item of project.stack.slice(0, 4)) {
        expect(article).toHaveTextContent(item);
      }
    }
    for (const project of projects) {
      expect(screen.queryByText(project.description.es), project.id).toBeNull();
    }
  });

  it("unfolds a project below the row, switches to another and folds it again", async () => {
    const user = userEvent.setup();
    render(<App />);
    const [first, second] = projects;
    if (first === undefined || second === undefined) throw new Error("needs two projects");
    const firstCard = screen.getByRole("button", { name: first.name });
    const secondCard = screen.getByRole("button", { name: second.name });

    await user.click(firstCard);
    expect(firstCard).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("article", { name: first.name })).toHaveTextContent(
      first.description.es,
    );

    await user.click(secondCard);
    expect(firstCard).toHaveAttribute("aria-expanded", "false");
    expect(secondCard).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByText(second.description.es)).toHaveLength(1);
    expect(screen.queryByText(first.description.es)).toBeNull();

    await user.click(secondCard);
    expect(secondCard).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(second.description.es)).toBeNull();
  });

  it("opens with the keyboard", async () => {
    const user = userEvent.setup();
    render(<App />);
    const [first] = projects;
    if (first === undefined) throw new Error("needs a project");
    screen.getByRole("button", { name: first.name }).focus();

    await user.keyboard("{Enter}");

    expect(screen.getByText(first.description.es)).toBeInTheDocument();
  });

  it("gives every unfolded project its links, preview and placeholders", async () => {
    const user = userEvent.setup();
    render(<App />);
    for (const project of projects) {
      await user.click(screen.getByRole("button", { name: project.name }));
      const detail = screen.getByRole("article", { name: project.name });
      const hrefs = [
        ...(project.code ?? []).map((link) => link.href),
        ...(project.site === undefined ? [] : [project.site]),
      ];
      for (const href of hrefs) {
        const link = detail.querySelector(`a[href="${href}"]`);
        expect(link, href).not.toBeNull();
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
      const text = detail.textContent;
      expect(text.includes("Repositorio privado"), project.id).toBe(
        (project.code ?? []).length === 0,
      );
      expect(text.includes("Vista previa próximamente"), project.id).toBe(
        project.preview === undefined,
      );
      expect(text.includes("Web próximamente"), project.id).toBe(project.site === undefined);
      expect(detail.querySelectorAll("img"), project.id).toHaveLength(
        project.preview === undefined ? 0 : 1,
      );
      const placeholder = within(detail).queryByText("Web próximamente");
      expect(placeholder?.closest("a") ?? null).toBeNull();
    }
  });
});
