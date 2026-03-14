"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { homepageExamples } from "@/components/marketing/destination-data";
import { NomardyLogo, NomardyMark } from "@/components/marketing/nomardy-logo";

const nationalityOptions = ["Nigeria"];

const destinationOptions = [
  "United Kingdom",
  "United Arab Emirates",
  "Rwanda",
  "Ghana",
  "Morocco",
  "Canada",
  "South Africa",
  "Schengen",
  "Kenya",
  "Namibia",
  "Ivory Coast",
  "Egypt",
  "Senegal",
  "Mauritius",
  "Uganda",
  "Thailand",
  "Vietnam",
  "Seychelles",
  "Philippines",
  "Qatar",
  "Maldives",
  "Japan",
  "Singapore",
  "United States"
];

export function VisaCheckerPage() {
  const router = useRouter();
  const [nationality, setNationality] = useState("Nigeria");
  const [destination, setDestination] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMenuOpen(false);

    if (!destination.trim()) {
      setError("Enter a destination to check the route.");
      return;
    }

    setError(null);
    const query = new URLSearchParams({
      nationality,
      destination: destination.trim()
    });
    router.push(`/visa-check?${query.toString()}`);
  }

  return (
    <main className="editorial-page">
      <header className="site-header section-reveal">
        <div className="site-header-inner reveal-a">
          <a href="/" aria-label="Nomardy home">
            <NomardyLogo />
          </a>

          <nav className="desktop-nav" aria-label="Primary">
            <a href="#flow">Visa Check</a>
            <a href="/destinations">Destinations</a>
            <a href="#destinations">Places to go</a>
            <a href="/destinations">Budgets</a>
          </nav>

          <a className="header-cta" href="#flow">
            Check a route
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`} id="mobile-menu">
          <nav className="mobile-nav" aria-label="Mobile primary">
            <a href="#flow" onClick={() => setMenuOpen(false)}>
              Visa Check
            </a>
            <a href="/destinations" onClick={() => setMenuOpen(false)}>
              Destinations
            </a>
            <a href="#destinations" onClick={() => setMenuOpen(false)}>
              Places to go
            </a>
            <a href="/destinations" onClick={() => setMenuOpen(false)}>
              Budgets
            </a>
            <a className="header-cta mobile-cta" href="#flow" onClick={() => setMenuOpen(false)}>
              Check a route
            </a>
          </nav>
        </div>
      </header>

      <section className="masthead section-reveal">
        <div className="masthead-copy reveal-a">
          <div className="masthead-brand">
            <NomardyMark />
          </div>
          <p className="kicker">Nomardy</p>
          <h1>Travel should feel electric, not tiring.</h1>
          <p className="lede">
          Discover where your passport can take you, what it will cost, and how to get there without guessing through visa rules and messy routes.
          </p>
        </div>

        <aside className="visa-check-card reveal-b" id="flow">
          <p className="panel-label">Visa check</p>
          <h2>Can I actually travel there?</h2>
          <form className="search-form" onSubmit={handleSubmit}>
            <label className="field" htmlFor="nationality">
              <span>Passport nationality</span>
              <select
                id="nationality"
                value={nationality}
                onChange={(event) => setNationality(event.target.value)}
              >
                {nationalityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="field" htmlFor="destination">
              <span>Destination</span>
              <input
                id="destination"
                list="destination-options"
                placeholder="Japan, Ghana, Schengen, United States"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </label>

            <datalist id="destination-options">
              {destinationOptions.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>

            <button className="primary-button" type="submit">
              Check visa route
            </button>
          </form>

          <div className="search-card-foot">
            <p className="search-note">Guest mode only. Nigeria is currently supported first.</p>
            <div className="flow-steps" aria-label="Flow steps">
              <span>Passport</span>
              <span>Destination</span>
              <span>Result</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="examples-section section-reveal" id="destinations">
        <div className="flow-head reveal-b">
          <p className="kicker">Right now</p>
          <h2>Places that already feel within reach.</h2>
        </div>

        <div className="route-preview-list examples-grid reveal-c">
          {homepageExamples.map((preview) => (
            <a
              className={`route-preview-card ${preview.featured ? "route-preview-card-featured" : ""}`}
              key={preview.slug}
              href={`/destinations?country=${preview.slug}`}
            >
              <div className="route-preview-head">
                <span className="destination-emoji" aria-hidden="true">
                  {preview.emoji}
                </span>
                <p className="route-preview-tag">{preview.visaStatus}</p>
              </div>
              <h2>{preview.name}</h2>
              <p className="route-preview-price">{preview.fromPrice}</p>
              <p>{preview.note}</p>
            </a>
          ))}
        </div>

        <a className="examples-link" href="/destinations">
          Explore destination budgets and route difficulty
        </a>
      </section>
    </main>
  );
}
