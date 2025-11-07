const URL = 'https://dapi.stalcraft.net';

const baseURL =
  'https://api.github.com/repos/EXBO-Studio/stalcraft-database/contents/ru/items/weapon';
const basePaths = [
  'assault_rifle',
  'pistol',
  'machine_gun',
  'shotgun_rifle',
  'sniper_rifle',
  'submachine_gun',
];

export const getAllItem = async () => {
  try {
    const allCategory = await Promise.all(
      basePaths.map((path) =>
        fetch(`${baseURL}/${path}`).then((res) => res.json()),
      ),
    );
    const ejectJson = allCategory
      .flat()
      .filter((item: any) => item.name.endsWith('.json'))
      .map((item: any) => item.download_url);

    const itemResponses = await Promise.all(
      ejectJson.map((url) => fetch(url).then((res) => res.json())),
    );

    return itemResponses;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};
