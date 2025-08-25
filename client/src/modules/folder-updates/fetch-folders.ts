import type { IFetchFolders } from "../../core/dao/fetch-folders.interface";

const freshdeskDomain = "https://hearlink.freshdesk.com";
const apiKey = import.meta.env.VITE_FRESHDESK_API_KEY;

export const fetchFolders = async ({
  categoryNumber,
}: {
  categoryNumber: number;
}): Promise<IFetchFolders[]> => {
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

    const data = (await response.json()) as IFetchFolders[];
    return data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw new Error("Internal Server Error");
  }
};
