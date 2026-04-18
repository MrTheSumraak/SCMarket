
export const getImageItem = (id: string) => {
    const files = import.meta.glob('/src/assets/items/**/*.png', { eager: true});

    const path = Object.keys(files).find((p) => p.includes(`/${id}.png`));

    return path ? (files as any)[path].default : null;
}