//----------------------------------------------------
// AUTO-LOADER FOR LOCAL ITEM FILES (VITE)
//----------------------------------------------------

// Загружаем *карты путей*, а НЕ сами файлы
const jsonMap = import.meta.glob(
  "/src/utils/itemBase/global/items/**/*.json"
);

const iconMap = import.meta.glob(
  "/src/utils/itemBase/global/icons/**/*.png",
  { query: "?url", import: "default" }
);

//----------------------------------------------------
// HELPERS FILE READS
//----------------------------------------------------

function buildIconPath(category: string, sub: string | undefined, id: string) {
  return (
    `/src/utils/itemBase/global/icons/${category}` +
    (sub ? `/${sub}` : "") +
    `/${id}.png`
  );
}

function parsePath(path: string) {
  const rel = path.replace("/src/utils/itemBase/global/items/", "");
  const parts = rel.split("/");

  const category = parts[0];
  const subCategory = parts.length === 3 ? parts[1] : undefined;
  const fileName = parts.at(-1)!.replace(".json", "");

  return { category, subCategory, fileName };
}

//----------------------------------------------------
// READ FILE ON SETTING FILES
//----------------------------------------------------

export async function getItemsByCategory(category: string) {
  const items: any[] = [];

  for (const path in jsonMap) {
    if (!path.includes(`/${category}/`)) continue;

    const { subCategory, fileName: id } = parsePath(path);

    // Загружаем JSON-модуль
  const module = await jsonMap[path]() as { default: any };
  const itemData = module.default;


    // Ищем PNG
    const iconPath = buildIconPath(category, subCategory, id);

    let image = null;
    if (iconMap[iconPath]) {
      image = await iconMap[iconPath]();
    }

    items.push({
      ...itemData,   // теперь это чистый объект
      id,
      category,
      subCategory,
      image,
    });
  }

  return items;
}
