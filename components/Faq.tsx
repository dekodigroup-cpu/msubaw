import { FAQS } from "@/lib/site";
import { Reveal } from "./Reveal";

/**
 * Native <details> accordion, deliberately not a JS widget: answers are
 * present and readable in the server HTML, which is what AI crawlers and
 * the accessibility tree consume. Keyboard support comes free.
 */
export function Faq() {
  return (
    <div className="mt-12 border-t border-paper-edge">
      {FAQS.map((item, i) => (
        <Reveal key={item.q} delay={i * 45}>
          <details className="group border-b border-paper-edge">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-maroon [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-lg font-semibold leading-snug text-ink group-open:text-maroon md:text-xl">
                {item.q}
              </h3>
              <span
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-2xl leading-none text-maroon-lit transition-transform duration-300 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="measure pb-7 leading-relaxed text-ink-soft">
              {item.a}
            </p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
