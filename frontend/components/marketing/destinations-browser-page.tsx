"use client";

import { Fragment, startTransition, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { destinationMap, destinationsCatalog } from "@/components/marketing/destination-data";
import { NomardyLogo } from "@/components/marketing/nomardy-logo";

export function DestinationsBrowserPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("country");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug);
  const [columnCount, setColumnCount] = useState(2);

  const selected = useMemo(() => {
    if (!selectedSlug) {
      return null;
    }
    return destinationMap.get(selectedSlug) ?? null;
  }, [selectedSlug]);
  const selectedIndex = selected
    ? destinationsCatalog.findIndex((entry) => entry.slug === selected.slug)
    : -1;
  const rowEndIndex =
    selectedIndex >= 0
      ? Math.min(
          Math.floor(selectedIndex / columnCount) * columnCount + (columnCount - 1),
          destinationsCatalog.length - 1
        )
      : -1;

  useEffect(() => {
    function updateColumns() {
      setColumnCount(window.innerWidth <= 720 ? 1 : 2);
    }

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  function selectCountry(slug: string) {
    setSelectedSlug(slug);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("country", slug);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function clearSelection() {
    setSelectedSlug(null);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("country");
      const next = params.toString();
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    });
    requestAnimationFrame(() => {
      const top = document.querySelector(".destinations-hero");
      top?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <main className="editorial-page destinations-page">
      <header className="site-header">
        <div className="site-header-inner">
          <a href="/" aria-label="Nomardy home">
            <NomardyLogo />
          </a>
          <nav className="desktop-nav" aria-label="Primary">
            <a href="/">Visa Check</a>
            <a href="/destinations">Destinations</a>
          </nav>
          <a className="header-cta" href="/">
            Check a route
          </a>
        </div>
      </header>

      <section className="destinations-hero">
        <p className="kicker">Destinations</p>
        <h1>Where you can go, what it may cost, and how the route feels.</h1>
        <p className="lede">
          Browse a destination, click into it, and get the softer decision-making context around
          cost, visa difficulty, and travel mood.
        </p>
      </section>

      <section className="destinations-browser-section">
        <div className="flow-head">
          <p className="kicker">Browse destinations</p>
          <h2>Choose a place and its details open directly beneath that row.</h2>
        </div>

        <div className="destinations-grid destinations-grid-compact">
          {destinationsCatalog.map((destination, index) => {
            const isSelected = selected?.slug === destination.slug;

            return (
              <Fragment key={destination.slug}>
                <button
                  className={`destination-directory-card destination-card-button destination-card-compact ${
                    isSelected ? "destination-card-active" : ""
                  }`}
                  onClick={() => selectCountry(destination.slug)}
                  type="button"
                >
                  <div className="destination-directory-head">
                    <span className="destination-emoji" aria-hidden="true">
                      {destination.emoji}
                    </span>
                    <div className="destination-directory-copy">
                      <h2>{destination.name}</h2>
                      <p className="route-preview-price">From {destination.fromPrice}</p>
                    </div>
                  </div>
                  <div className="destination-directory-foot">
                    <span className="route-preview-tag">{destination.visaStatus}</span>
                    <p>{destination.note}</p>
                  </div>
                </button>

                {selected && index === rowEndIndex ? (
                  <article className="destination-spotlight-card destination-inline-card">
                    <div className="destination-spotlight-top">
                      <div className="destination-focus-head">
                        <span
                          className="destination-emoji destination-emoji-large"
                          aria-hidden="true"
                        >
                          {selected.emoji}
                        </span>
                        <div>
                          <p className="kicker">Selected destination</p>
                          <h2>{selected.name}</h2>
                          <p className="route-preview-tag">{selected.visaStatus}</p>
                        </div>
                      </div>
                      <button className="secondary-action" type="button" onClick={clearSelection}>
                        Check another route
                      </button>
                    </div>

                    <p className="destination-spotlight-copy">{selected.note}</p>

                    <div className="metrics-grid destination-focus-metrics">
                      <article className="metric-card">
                        <p className="metric-label">Budget entry point</p>
                        <p className="metric-value">{selected.fromPrice}</p>
                      </article>
                      <article className="metric-card">
                        <p className="metric-label">Best for</p>
                        <p className="metric-value">{selected.bestFor}</p>
                      </article>
                      <article className="metric-card">
                        <p className="metric-label">Ideal stay</p>
                        <p className="metric-value">{selected.stay}</p>
                      </article>
                      <article className="metric-card">
                        <p className="metric-label">Route feel</p>
                        <p className="metric-value">{selected.routeMood}</p>
                      </article>
                    </div>

                    <div className="budget-strip">
                      <div className="budget-grid">
                        <article className="budget-card">
                          <p className="metric-label">Travel rhythm</p>
                          <p className="budget-value">{selected.rhythm}</p>
                        </article>
                        <article className="budget-card">
                          <p className="metric-label">Budget band</p>
                          <p className="budget-value">{selected.budgetBand}</p>
                        </article>
                      </div>
                    </div>
                  </article>
                ) : null}
              </Fragment>
            );
          })}
        </div>
      </section>
    </main>
  );
}
