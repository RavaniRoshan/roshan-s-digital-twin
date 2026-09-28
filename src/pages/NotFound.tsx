import { Link } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { Block, SectionLabel } from "@/components/Rows";
import type { TickerItem } from "@/components/Ticker";

const TICKER: TickerItem[] = [
  { id: "fault", label: "fault", meta: "404", href: "#fault" },
  { id: "about", label: "about", meta: "position", href: "#about" },
];

export function NotFound() {
  return (
    <Shell ticker={TICKER}>
      <Block id="fault">
        <SectionLabel>fault Â· 404</SectionLabel>
        <h1 className="text-sm leading-relaxed font-semibold">null reference.</h1>
        <p className="mt-3 text-sm leading-relaxed o-2">
          That route resolves to nothing. The single column only has the index.
        </p>
        <Link
          to="/"
          className="flat mt-5 inline-block px-3 py-2 text-sm transition-colors hover:border-chroma/50"
        >
          return to index
        </Link>
      </Block>
    </Shell>
  );
}
