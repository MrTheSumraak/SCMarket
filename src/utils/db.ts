import { openDB } from 'idb';
import type { IAllItems } from '../service/slices/items.slice';

const DB_NAME = 'StalcraftDB';
const STORE_NAME = 'items';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function saveItems(items: IAllItems) {
  const db = await getDB();
  await db.put(STORE_NAME, items, 'allItems');
}

export async function loadItems(): Promise<IAllItems | null> {
  const db = await getDB();
  const items = await db.get(STORE_NAME, 'allItems');
  return items || null;
}
