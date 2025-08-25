import type { IFetchCategories } from "../core/dao/fetch-folders.interface";

const freshdeskDomain = "https://hearlink.freshdesk.com";
const apiKey = import.meta.env.VITE_FRESHDESK_API_KEY;

const fetchFolders = async ({
  categoryNumber,
}: {
  categoryNumber: number;
}): Promise<IFetchCategories[]> => {
  try {
    const url = `${freshdeskDomain}/api/v2/solutions/categories/${categoryNumber}/folders`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${btoa(apiKey + ":X")}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as IFetchCategories[];
    return data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw new Error("Internal Server Error");
  }
};

export default fetchFolders;
