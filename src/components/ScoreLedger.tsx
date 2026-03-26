import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ALLOWED_DELTAS,
  addAction,
  type AllowedDelta,
  getAllActions,
  type LedgerAction,
  undoLastAction,
} from "@/lib/scoreLedgerDb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MONEY_PER_POINT = 20;

function deriveStats(actions: LedgerAction[]) {
  const pointBalance = actions.reduce((s, a) => s + a.delta, 0);
  const winPoints = actions.reduce(
    (s, a) => s + (a.delta > 0 ? a.delta : 0),
    0
  );
  const lossPoints = actions.reduce(
    (s, a) => s + (a.delta < 0 ? -a.delta : 0),
    0
  );
  const winLostNet = winPoints - lossPoints;
  const money = pointBalance * MONEY_PER_POINT;
  return { pointBalance, winPoints, lossPoints, winLostNet, money };
}

const WIN_DELTAS = ALLOWED_DELTAS.filter((d) => d > 0);
/** Match win row: same magnitudes left → right (−1 under +1, …, −5 under +5). */
const LOSS_DELTAS: readonly AllowedDelta[] = [-1, -2, -3, -5];

export default function ScoreLedger() {
  const [actions, setActions] = useState<LedgerAction[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const list = await getAllActions();
    setActions(list);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await refresh();
        if (!cancelled) {
          setStatus("ready");
        }
      } catch (e) {
        if (!cancelled) {
          setStatus("error");
          setErrorMessage(e instanceof Error ? e.message : "Failed to load");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  const { winPoints, lossPoints, winLostNet, money } = useMemo(
    () => deriveStats(actions),
    [actions]
  );

  const onPick = async (delta: number) => {
    if (status !== "ready" || busy) {
      return;
    }
    setBusy(true);
    setErrorMessage(null);
    try {
      await addAction(delta);
      await refresh();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setBusy(false);
    }
  };

  const onUndo = async () => {
    if (status !== "ready" || busy || actions.length === 0) {
      return;
    }
    setBusy(true);
    setErrorMessage(null);
    try {
      await undoLastAction();
      await refresh();
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Undo failed");
    } finally {
      setBusy(false);
    }
  };

  if (status === "loading") {
    return (
      <p className="text-muted-foreground text-center py-8">Loading ledger…</p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-destructive text-center py-8" role="alert">
        {errorMessage ?? "Something went wrong."}
      </p>
    );
  }

  return (
    <div className="flex max-w-2xl flex-col gap-8 mx-auto py-8 px-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-5">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Wins (pts)</CardDescription>
            <CardTitle className="text-neon-pink tabular-nums">
              {winPoints}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Losses (pts)</CardDescription>
            <CardTitle className="text-destructive tabular-nums">
              {lossPoints}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Win − loss (pts)</CardDescription>
            <CardTitle
              className={cn(
                "tabular-nums",
                winLostNet > 0 && "text-neon-pink",
                winLostNet < 0 && "text-destructive"
              )}
            >
              {winLostNet > 0 ? `+${winLostNet}` : winLostNet}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Money</CardDescription>
            <CardTitle className="tabular-nums">{money}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader className="space-y-1.5 p-5 pb-3 sm:p-6 sm:pb-4">
          <CardTitle className="text-lg">Add points</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 p-5 pt-0 sm:p-6 sm:pt-0">
          {errorMessage ? (
            <p className="text-sm text-destructive" role="alert">
              {errorMessage}
            </p>
          ) : null}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 sm:items-start lg:gap-10">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-neon-pink">
                Win
              </p>
              <div className="grid grid-cols-4 gap-4 sm:gap-5">
                {WIN_DELTAS.map((d) => (
                  <Button
                    key={d}
                    type="button"
                    className="h-11 w-full min-w-0 px-1 sm:px-2"
                    disabled={busy}
                    onClick={() => void onPick(d)}
                  >
                    +{d}
                  </Button>
                ))}
              </div>
            </div>
            <div
              className="flex flex-col gap-3 border-t border-border pt-8 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 lg:pl-8"
              aria-label="Lose points"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Lose
              </p>
              <div className="grid grid-cols-4 gap-4 sm:gap-5">
                {LOSS_DELTAS.map((d) => (
                  <Button
                    key={d}
                    type="button"
                    className="h-11 w-full min-w-0 px-1 sm:px-2"
                    disabled={busy}
                    onClick={() => void onPick(d)}
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full"
            disabled={busy || actions.length === 0}
            onClick={() => void onUndo()}
          >
            Undo last
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">History</CardTitle>
          <CardDescription>
            Oldest first. {actions.length} entr
            {actions.length === 1 ? "y" : "ies"}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {actions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No actions yet.</p>
          ) : (
            <ol className="list-decimal list-inside space-y-1 text-sm max-h-48 overflow-y-auto">
              {actions.map((a) => (
                <li
                  key={a.id}
                  className={cn(
                    "tabular-nums",
                    a.delta > 0 ? "text-neon-pink" : "text-destructive"
                  )}
                >
                  {a.delta > 0 ? `+${a.delta}` : a.delta}
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

