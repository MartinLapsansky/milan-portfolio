"use client";

import { useEffect, useState } from "react";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import NavItem from "@/components/molecules/NavItem";
import portrait from "@/assets/profile_photo1.png";

interface NavItemConfig {
  id: string;
  href: string;
  label: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: "domov", href: "#domov", label: "DOMOV" },
  { id: "o-mne", href: "#o-mne", label: "O MNE" },
  { id: "sluzby", href: "#sluzby", label: "SLUŽBY" },
  {
    id: "priebeh-spoluprace",
    href: "#priebeh-spoluprace",
    label: "PRIEBEH SPOLUPRÁCE",
  },
  { id: "projekty", href: "#projekty", label: "PROJEKTY" },
  { id: "kontakt", href: "#kontakt", label: "KONTAKT" },
];

export default function NavBar() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id),
    ).filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <nav
        aria-label="Hlavná navigácia"
        className="hidden items-center gap-1 rounded-full border border-border bg-surface p-1.5 shadow-sm lg:flex"
      >
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            href={item.href}
            label={item.label}
            active={activeId === item.id}
          />
        ))}
      </nav>

      <Button href="#kontakt" variant="primary" size="sm" onClick={closeMenu}>
        <Avatar src={portrait} alt="Milan Ivančák" size="sm" online />
        <span>KONTAKTUJ MA</span>
      </Button>

      <button
        type="button"
        aria-label={menuOpen ? "Zavrieť menu" : "Otvoriť menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        onClick={() => setMenuOpen((isOpen) => !isOpen)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-text transition-colors hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring lg:hidden"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden="true"
        >
          {menuOpen ? (
            <>
              <path d="M6 6 18 18" />
              <path d="M18 6 6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 z-40 border-t border-border bg-surface p-4 shadow-lg sm:top-20 lg:hidden"
        >
          <nav aria-label="Mobilná navigácia" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                href={item.href}
                label={item.label}
                active={activeId === item.id}
                onClick={closeMenu}
              />
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
