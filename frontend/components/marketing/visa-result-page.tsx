"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { destinationsCatalog } from "@/components/marketing/destination-data";
import { NomardyLogo } from "@/components/marketing/nomardy-logo";

type VisaCheckSuccess = {
  status: "success";
  data: {
    passport_country: string;
    destination: string;
    destination_code: string;
    requirement_type: string;
    allowed_stay: string;
    processing_time: string;
    visa_fee: {
      amount: number | null;
      currency: string;
      note: string;
    };
    processing_note: string;
    last_updated: string;
  };
};

type BudgetTier = {
  amount: number;
  currency: string;
  trip_length_days: number;
  note: string;
};

type BudgetEstimateSuccess = {
  status: "success";
  data: {
    destination: string;
    budget: BudgetTier;
    mid_range: BudgetTier;
    luxury: BudgetTier;
    last_updated: string;
  };
};

type ApiError = {
  status: "error";
  message: string;
};

function formatRequirementType(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(parsed);
}

function formatVisaFee(amount: number | null, currency: string) {
  if (amount === null) {
    return "Check official source";
  }
  if (amount === 0) {
    return "No visa fee";
  }
  return `${currency} ${amount.toFixed(0)}`;
}

function formatBudget(tier: BudgetTier) {
  return `${tier.currency} ${tier.amount}`;
}

function getDestinationFlag(destination: string) {
  const normalized = destination.trim().toLowerCase();
  const match = destinationsCatalog.find((entry) => {
    return (
      entry.queryValue.toLowerCase() === normalized ||
      entry.name.toLowerCase() === normalized
    );
  });

  return match?.emoji ?? "✦";
}

type Props = {
  nationality: string;
  destination: string;
};

export function VisaResultPage({ nationality, destination }: Props) {
  const router = useRouter();
  const apiBaseUrl = useMemo(() => {
    return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";
  }, []);
  const destinationFlag = useMemo(() => getDestinationFlag(destination), [destination]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visaResult, setVisaResult] = useState<VisaCheckSuccess["data"] | null>(null);
  const [budgetResult, setBudgetResult] = useState<BudgetEstimateSuccess["data"] | null>(null);

  useEffect(() => {
    async function load() {
      if (!destination.trim()) {
        setError("No destination was provided.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({ nationality, destination });
        const [visaResponse, budgetResponse] = await Promise.all([
          fetch(`${apiBaseUrl}/visa-check?${query.toString()}`, { cache: "no-store" }),
          fetch(`${apiBaseUrl}/budget-estimate?${query.toString()}`, { cache: "no-store" })
        ]);

        const visaPayload = (await visaResponse.json()) as VisaCheckSuccess | ApiError;
        const budgetPayload = (await budgetResponse.json()) as BudgetEstimateSuccess | ApiError;

        if (!visaResponse.ok || visaPayload.status === "error") {
          setError(
            visaPayload.status === "error"
              ? visaPayload.message
              : "Unable to load visa information."
          );
          setIsLoading(false);
          return;
        }

        if (!budgetResponse.ok || budgetPayload.status === "error") {
          setError(
            budgetPayload.status === "error"
              ? budgetPayload.message
              : "Unable to load budget information."
          );
          setIsLoading(false);
          return;
        }

        setVisaResult(visaPayload.data);
        setBudgetResult(budgetPayload.data);
      } catch {
        setError("The travel service is unavailable right now. Start the API and try again.");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [apiBaseUrl, destination, nationality]);

  return (
    <main className="editorial-page result-page-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <a href="/" aria-label="Nomardy home">
            <NomardyLogo />
          </a>
          <nav className="desktop-nav" aria-label="Primary">
            <a href="/">Visa Check</a>
            <a href="/destinations">Destinations</a>
          </nav>
          <a className="header-cta" href="/destinations">
            Explore destinations
          </a>
        </div>
      </header>

      <section className="result-page-intro">
        <div className="result-page-intro-copy">
          <p className="kicker">Route checked</p>
          <h1>{destination || "Destination"}</h1>
          <p className="lede">
            This page gives you the travel answer in one place: visa route, processing
            expectations, and trip cost before you decide what to do next.
          </p>
        </div>
        <div className="result-page-intro-mark" aria-hidden="true">
          <span className="result-page-flag">{destinationFlag}</span>
        </div>
      </section>

      <section className="result-section result-section-single" aria-live="polite">
        {isLoading ? (
          <article className="result-card state-card" aria-busy="true">
            <p className="kicker">Result</p>
            <h2>Checking this route now.</h2>
            <div className="loading-lines">
              <span />
              <span />
              <span />
              <span />
            </div>
          </article>
        ) : error ? (
          <article className="result-card state-card error-card">
            <p className="kicker">Result</p>
            <h2>No route found yet.</h2>
            <p className="state-copy">{error}</p>
          </article>
        ) : visaResult && budgetResult ? (
          <article className="result-card result-card-full">
            <div className="result-page-actions">
              <p className="search-note">Passport nationality: {nationality}</p>
              <button className="primary-button" type="button" onClick={() => router.push("/")}>
                Check another route
              </button>
            </div>

            <div className="result-topline">
              <div>
                <p className="kicker">Visa result</p>
                <h2>{visaResult.destination}</h2>
              </div>
              <span className="result-badge">
                {formatRequirementType(visaResult.requirement_type)}
              </span>
            </div>

            <div className="metrics-grid">
              <article className="metric-card">
                <p className="metric-label">Requirement type</p>
                <p className="metric-value">{formatRequirementType(visaResult.requirement_type)}</p>
              </article>
              <article className="metric-card">
                <p className="metric-label">Allowed stay</p>
                <p className="metric-value">{visaResult.allowed_stay}</p>
              </article>
              <article className="metric-card">
                <p className="metric-label">Processing time</p>
                <p className="metric-value">{visaResult.processing_time}</p>
              </article>
              <article className="metric-card">
                <p className="metric-label">Visa fee</p>
                <p className="metric-value">
                  {formatVisaFee(visaResult.visa_fee.amount, visaResult.visa_fee.currency)}
                </p>
              </article>
              <article className="metric-card">
                <p className="metric-label">Last verified</p>
                <p className="metric-value">{formatDate(visaResult.last_updated)}</p>
              </article>
            </div>

            <div className="editorial-copy">
              <p>{visaResult.processing_note}</p>
              <p>{visaResult.visa_fee.note}</p>
            </div>

            <div className="budget-strip">
              <div className="budget-strip-head">
                <p className="metric-label">Estimated trip cost</p>
                <p className="budget-updated">Updated {formatDate(budgetResult.last_updated)}</p>
              </div>

              <div className="budget-grid">
                <article className="budget-card">
                  <p className="metric-label">Budget</p>
                  <p className="budget-value">{formatBudget(budgetResult.budget)}</p>
                  <p className="budget-note">
                    {budgetResult.budget.trip_length_days}-day estimate. {budgetResult.budget.note}
                  </p>
                </article>
                <article className="budget-card">
                  <p className="metric-label">Mid-range</p>
                  <p className="budget-value">{formatBudget(budgetResult.mid_range)}</p>
                  <p className="budget-note">
                    {budgetResult.mid_range.trip_length_days}-day estimate.{" "}
                    {budgetResult.mid_range.note}
                  </p>
                </article>
                <article className="budget-card">
                  <p className="metric-label">Luxury</p>
                  <p className="budget-value">{formatBudget(budgetResult.luxury)}</p>
                  <p className="budget-note">
                    {budgetResult.luxury.trip_length_days}-day estimate.{" "}
                    {budgetResult.luxury.note}
                  </p>
                </article>
              </div>
            </div>

            <div className="disclaimer-box" id="advisory">
              <p className="metric-label">Advisory disclaimer</p>
              <p>
                Visa information is advisory only. Always confirm final rules with the relevant
                embassy, consulate, or official immigration authority before booking.
              </p>
            </div>
          </article>
        ) : null}
      </section>
    </main>
  );
}
