export function SeoContent() {
  return (
    <section className="mx-auto mt-16 max-w-4xl space-y-12">
      {/* What is */}
      <article>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
          What is a Random Birthday Generator?
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-white/60">
          <p>
            A random birthday generator is a tool that creates random dates of
            birth within a specified age range. It uses cryptographically secure
            randomness to ensure every generated date is fair and unpredictable.
          </p>
          <p>
            Unlike simple random date generators, our tool focuses on realistic
            birthday generation — you set the age range (e.g., 18–65), and the
            generator produces dates that correspond to people within that age
            range today. This makes it ideal for testing, role-playing, and
            privacy protection.
          </p>
        </div>
      </article>

      {/* How to Use */}
      <article>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
          How to Use
        </h2>
        <div className="space-y-3 text-sm leading-relaxed text-white/60">
          <ol className="list-inside list-decimal space-y-2">
            <li>
              <strong className="text-white/80">Set the count</strong> —
              Choose how many birthdays to generate (1 to 1000).
            </li>
            <li>
              <strong className="text-white/80">Adjust the age range</strong> —
              Set minimum and maximum ages to control the generation.
            </li>
            <li>
              <strong className="text-white/80">Pick a format</strong> —
              Choose from ISO, US, European, verbose, or year-only formats.
            </li>
            <li>
              <strong className="text-white/80">Generate</strong> —
              Click the button or press Enter to generate instantly.
            </li>
            <li>
              <strong className="text-white/80">Copy or download</strong> —
              Copy individual results, copy all, or download as TXT/CSV/JSON.
            </li>
          </ol>
        </div>
      </article>

      {/* Why Use */}
      <article>
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
          Why Use Our Generator?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass-subtle p-5">
            <h3 className="mb-2 text-sm font-semibold text-white">
              Cryptographically Fair
            </h3>
            <p className="text-xs leading-relaxed text-white/60">
              Every birthday is generated using your browser&apos;s
              <code className="mx-1 rounded bg-white/5 px-1 py-0.5 text-[11px] text-blue-300">
                crypto.getRandomValues
              </code>
              API — the same standard used for security applications.
            </p>
          </div>
          <div className="glass-subtle p-5">
            <h3 className="mb-2 text-sm font-semibold text-white">
              Zero Data Storage
            </h3>
            <p className="text-xs leading-relaxed text-white/60">
              Everything runs in your browser. No data is sent to any server,
              and no cookies or trackers are used.
            </p>
          </div>
          <div className="glass-subtle p-5">
            <h3 className="mb-2 text-sm font-semibold text-white">
              Multiple Formats &amp; Download
            </h3>
            <p className="text-xs leading-relaxed text-white/60">
              Support for ISO, US, European, and verbose date formats. Download
              results as TXT, CSV, or JSON for further processing.
            </p>
          </div>
          <div className="glass-subtle p-5">
            <h3 className="mb-2 text-sm font-semibold text-white">
              Shareable Results
            </h3>
            <p className="text-xs leading-relaxed text-white/60">
              Results are encoded directly into the URL — share the link with
              anyone and they&apos;ll see the same birthdays.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
