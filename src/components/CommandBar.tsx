import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CornerDownLeft, Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { site } from "@/content/site";
import { NAV_ITEMS } from "@/components/nav-items";

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandDialogPopup className="border-border bg-popover">
        <Command>
          <CommandInput placeholder="jump to a system, route, or signal…" />
          <CommandPanel>
            <CommandList>
              <CommandEmpty>no matching signal</CommandEmpty>

              <CommandGroup>
                <CommandGroupLabel>navigate</CommandGroupLabel>
                {NAV_ITEMS.map((item) => (
                  <CommandItem key={item.to} onClick={() => go(item.to)}>
                    <span className="readout w-5 text-xs text-muted-foreground">{item.index}</span>
                    <span className="font-mono">{item.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{item.hint}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup>
                <CommandGroupLabel>systems</CommandGroupLabel>
                {site.systems.map((sys) => (
                  <CommandItem key={sys.slug} onClick={() => go(`/systems/${sys.slug}`)}>
                    <Search className="size-3.5 text-muted-foreground" />
                    <span className="font-mono">{sys.codename}</span>
                    <span className="ml-auto truncate text-xs text-muted-foreground">{sys.tagline}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandSeparator />

              <CommandGroup>
                <CommandGroupLabel>channels</CommandGroupLabel>
                {site.identity.socials.map((s) => (
                  <CommandItem
                    key={s.label}
                    onClick={() => {
                      setOpen(false);
                      window.open(s.href, s.href.startsWith("http") ? "_blank" : undefined);
                    }}
                  >
                    <span className="font-mono">{s.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{s.handle}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            <span className="flex items-center gap-1.5">
              <CommandShortcut>↑</CommandShortcut>
              <CommandShortcut>↓</CommandShortcut> navigate
            </span>
            <span className="flex items-center gap-1.5">
              run <CornerDownLeft className="size-3" />
            </span>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}
