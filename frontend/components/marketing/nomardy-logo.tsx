export function NomardyMark() {
  return (
    <span className="brandmark-seal" aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img">
        <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M18 31V16l12 16V17"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 8v5M24 35v5M8 24h5M35 24h5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function NomardyLogo() {
  return (
    <span className="brandmark" aria-label="Nomardy">
      <NomardyMark />
      <span className="brandmark-word">
        Nomardy
        <small>Visa-first travel planning</small>
      </span>
    </span>
  );
}
