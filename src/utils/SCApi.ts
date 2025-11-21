//----------------------------------------------------
// GitHub API CONFIG
//----------------------------------------------------
const GH_TOKEN = import.meta.env.VITE_GH_TOKEN;

async function ghFetch(url: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${GH_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) {
    const msg = await res.text();
    console.error("GitHub API error:", msg);
    throw new Error(res.status + " " + res.statusText);
  }

  const data = await res.json();

  // Если файл → декодируем base64 UTF-8
  if (data.content && data.encoding === "base64") {
    const binary = atob(data.content);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoded = new TextDecoder("utf-8").decode(bytes);
    return JSON.parse(decoded);
  }

  return data;
}

// Простое кеширование
const cache = new Map<string, any>();
async function cachedFetch(url: string) {
  if (cache.has(url)) return cache.get(url);
  const data = await ghFetch(url);
  cache.set(url, data);
  return data;
}

//----------------------------------------------------
// CATEGORY DEFINITIONS
//----------------------------------------------------
export const BASE_CATEGORIES = {
  bullet: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/bullet/",
  other: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/other/",
  misc: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/misc/",
  medicine: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/medicine/",
  grenade: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/grenade/",
  food: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/food/",
  attachment: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/attachment/",
  backpacks: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/backpacks/",
  containers: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/containers/",
  drink: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/drink/",
  "weapon_style/skins": "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/weapon_style/skins/",
  "armor_style/skins": "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/armor_style/skins/",
} as const;

export type TSimpleCategory = keyof typeof BASE_CATEGORIES;

export const ADVANCED_CATEGORIES = {
  weapon: {
    base: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/weapon/",
    sub: ["pistol", "machine_gun", "assault_rifle", "shotgun_rifle", "sniper_rifle", "submachine_gun"],
  },
  armor: {
    base: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/armor/",
    sub: ["clothes", "combat", "combined", "device", "scientist"],
  },
  weapon_modules: {
    base: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/weapon_modules/",
    sub: ["weapon_module", "weapon_module_core", "weapon_module_remover"],
  },
  artefact: {
    base: "https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/artefact/",
    sub: ['biochemical', 'electrophysical', 'gravity', 'other_arts', 'thermal']
  }
} as const;

export type TAdvancedCategory = keyof typeof ADVANCED_CATEGORIES;

//----------------------------------------------------
// IMAGE URL HELPER
//----------------------------------------------------
function getImageUrl(id: string, category: string, subCategory?: string) {
  const fullPath = subCategory ? `${category}/${subCategory}` : category;
  return `https://raw.githubusercontent.com/EXBO-Studio/stalcraft-database/main/ru/icons/${fullPath}/${id}.png`;
}

//----------------------------------------------------
// HELPERS
//----------------------------------------------------
async function loadJsonFilesFromFolder(apiUrl: string, category: string, subCategory?: string) {
  const list = await cachedFetch(apiUrl);
  return list
    .filter((i: any) => i.name.endsWith(".json"))
    .map((i: any) => ({
      ...i,
      category,
      subCategory,
    }));
}

async function loadAdvancedCategory(base: string, sub: string, category: string) {
  const folder = await cachedFetch(base + sub);
  const items: any[] = [];

  for (const item of folder) {
    if (item.type === "file" && item.name.endsWith(".json")) {
      items.push({ ...item, category, subCategory: sub });
    }
    if (item.type === "dir") {
      const subfolder = await cachedFetch(item.url);
      for (const file of subfolder) {
        if (file.name.endsWith(".json")) items.push({ ...file, category, subCategory: sub });
      }
    }
  }

  return items;
}

//----------------------------------------------------
// PUBLIC API
//----------------------------------------------------
export async function getItemsByCategory(category: string) {
  try {
    let allItems: any[] = [];

    if (category in BASE_CATEGORIES) {
      const items = await loadJsonFilesFromFolder(BASE_CATEGORIES[category as TSimpleCategory], category);
      allItems = allItems.concat(items);
    } else if (category in ADVANCED_CATEGORIES) {
      const conf = ADVANCED_CATEGORIES[category as TAdvancedCategory];

      // Параллельная загрузка подкатегорий
      const subResults = await Promise.all(
        conf.sub.map(sub => loadAdvancedCategory(conf.base, sub, category))
      );
      allItems = subResults.flat();
    } else {
      throw new Error(`Unknown category: ${category}`);
    }

    // Параллельная загрузка всех файлов JSON
    const results = await Promise.all(allItems.map(i => cachedFetch(i.url)));

    return results.map((item, index) => {
      const baseItem = allItems[index];
      return {
        ...item,
        category: baseItem.category,
        subCategory: baseItem.subCategory,
        image: getImageUrl(item.id, baseItem.category, baseItem.subCategory),
      };
    });
  } catch (err) {
    console.error("getItemsByCategory error:", err);
    return [];
  }
}

