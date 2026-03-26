const DB_NAME = "avearistov-score";
const DB_VERSION = 1;
const STORE = "actions";

export const ALLOWED_DELTAS = [-5, -3, -2, -1, 1, 2, 3, 5] as const;
export type AllowedDelta = (typeof ALLOWED_DELTAS)[number];

export type LedgerAction = {
  id: number;
  delta: number;
};

type StoredAction = {
  delta: number;
};

const ALLOWED_DELTA_LOOKUP = Object.fromEntries(
  ALLOWED_DELTAS.map((d) => [d, true] as const)
) as Record<AllowedDelta, true>;

function isAllowedDelta(n: number): n is AllowedDelta {
  return n in ALLOWED_DELTA_LOOKUP;
}

function openDb(): Promise<IDBDatabase> {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("IndexedDB is not available"));
  }

  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error ?? new Error("Failed to open database"));
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { autoIncrement: true });
      }
    };
  });
}

function reqToPromise<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB request failed"));
  });
}

export async function getAllActions(): Promise<LedgerAction[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const out: LedgerAction[] = [];
    const req = store.openCursor();

    req.onsuccess = () => {
      const cursor = req.result;
      if (!cursor) {
        resolve(out);
        return;
      }
      const row = cursor.value as StoredAction;
      out.push({ id: cursor.primaryKey as number, delta: row.delta });
      cursor.continue();
    };
    req.onerror = () => reject(req.error ?? new Error("Cursor failed"));
  });
}

export async function addAction(delta: number): Promise<void> {
  if (!isAllowedDelta(delta)) {
    throw new Error(`Invalid delta: ${delta}`);
  }
  const db = await openDb();
  const tx = db.transaction(STORE, "readwrite");
  const store = tx.objectStore(STORE);
  await reqToPromise(store.add({ delta } satisfies StoredAction));
}

export async function undoLastAction(): Promise<boolean> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const req = store.openCursor(null, "prev");

    req.onsuccess = () => {
      const cursor = req.result;
      if (!cursor) {
        resolve(false);
        return;
      }
      const delReq = cursor.delete();
      delReq.onsuccess = () => resolve(true);
      delReq.onerror = () => reject(delReq.error);


    };
    req.onerror = () => reject(req.error ?? new Error("Undo cursor failed"));
  });
}
