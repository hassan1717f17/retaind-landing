"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, LogIn, ChevronDown, Briefcase, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/app-url";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Audience } from "./types";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Journey", href: "#journey" },
  { name: "Bad Hire Calculator", href: "/bad-hire-calculator" },
  { name: "Pricing", href: "/pricing" },
];

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  selectedAudience: Audience;
  /** Explicit audience choice (org toggle) — scrolls to the first section. */
  onSelectAudience: (a: Audience) => void;
  /** Ensure an audience exists (nav links) without forcing a scroll. */
  onEnsureAudience: (a: Audience) => void;
}

export function Navbar({
  mobileMenuOpen,
  setMobileMenuOpen,
  selectedAudience,
  onSelectAudience,
  onEnsureAudience,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b border-border transition-all duration-300 ${
        scrolled ? "bg-background/90 shadow-sm" : "bg-background/80"
      }`}
    >
      <div
        className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Logo / Wordmark */}
        <Link href="/" data-testid="link-logo" className="flex flex-col items-start">
          <span
            className={`font-bold tracking-tight transition-all duration-300 ${
              scrolled ? "text-3xl" : "text-4xl"
            }`}
          >
            <span className="text-foreground">Retaind</span>
          </span>
          <span className="text-sm text-muted-foreground italic -mt-1">Recruiting for Retention</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100"
              data-testid={`link-nav-${link.name.toLowerCase()}`}
              onClick={() => {
                if (!selectedAudience) onEnsureAudience("agency");
              }}
            >
              {link.name}
            </a>
          ))}
          {selectedAudience && (
            <button
              onClick={() =>
                onSelectAudience(selectedAudience === "agency" ? "inhouse" : "agency")
              }
              className="inline-flex items-center gap-2 rounded-full border border-foreground/40 bg-muted/60 px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              title="Switch audience"
              data-testid="nav-audience-indicator"
            >
              {selectedAudience === "agency" ? (
                <Briefcase className="w-4 h-4" />
              ) : (
                <Building2 className="w-4 h-4" />
              )}
              {selectedAudience === "agency" ? "Agency Recruiter" : "In-House Team"}
            </button>
          )}
          <Button asChild variant="default" data-testid="button-get-started-nav">
            <a href={APP_URL}>Get Started</a>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2" data-testid="button-login-nav">
                <LogIn className="w-4 h-4" />
                Login
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" data-testid="dropdown-login-menu">
              <DropdownMenuItem disabled data-testid="dropdown-item-agency">
                <Briefcase className="w-4 h-4 mr-2" />
                Agency
                <span className="ml-auto text-xs text-muted-foreground">Coming soon</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled data-testid="dropdown-item-inhouse">
                <Building2 className="w-4 h-4 mr-2" />
                In-House
                <span className="ml-auto text-xs text-muted-foreground">Coming soon</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled data-testid="dropdown-item-candidate">
                <Users className="w-4 h-4 mr-2" />
                Candidate
                <span className="ml-auto text-xs text-muted-foreground">Coming soon</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="container px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (!selectedAudience) onEnsureAudience("agency");
                }}
                data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
            {selectedAudience && (
              <button
                onClick={() =>
                  onSelectAudience(selectedAudience === "agency" ? "inhouse" : "agency")
                }
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/40 bg-muted/60 px-3 py-2 text-base font-medium text-foreground transition-colors hover:bg-muted"
                data-testid="nav-audience-indicator-mobile"
              >
                {selectedAudience === "agency" ? (
                  <Briefcase className="w-4 h-4" />
                ) : (
                  <Building2 className="w-4 h-4" />
                )}
                Viewing as {selectedAudience === "agency" ? "Agency Recruiter" : "In-House Team"}
              </button>
            )}
            <Button asChild className="w-full" variant="default" data-testid="button-get-started-mobile">
              <a href={APP_URL}>Get Started</a>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full gap-2" data-testid="button-login-mobile">
                  <LogIn className="w-4 h-4" />
                  Login
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-full" data-testid="dropdown-login-menu-mobile">
                <DropdownMenuItem disabled data-testid="dropdown-item-agency-mobile">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Agency
                  <span className="ml-auto text-xs text-muted-foreground">Coming soon</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled data-testid="dropdown-item-inhouse-mobile">
                  <Building2 className="w-4 h-4 mr-2" />
                  In-House
                  <span className="ml-auto text-xs text-muted-foreground">Coming soon</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled data-testid="dropdown-item-candidate-mobile">
                  <Users className="w-4 h-4 mr-2" />
                  Candidate
                  <span className="ml-auto text-xs text-muted-foreground">Coming soon</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>
      )}
    </header>
  );
}
