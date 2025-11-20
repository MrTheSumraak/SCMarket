import { CATEGORY_MAP } from "./types";

export function getFolderPath(category: string, subCategory?: string) {
    // CATEGORY_MAP ключи это "weapons", "armors" и т.д.
    // API возвращает category: "weapon", "armor", "artefact"…
    // Поправляем несовпадения
    let folder = category;

    if (category === "weapon") folder = "weapon";
    else if (category === "armor") folder = "armor";
    else if (category === "artefact") folder = "artefact";
    else folder = CATEGORY_MAP[category] || category;

    return subCategory ? `${folder}/${subCategory}` : folder;
}
