import type { IFetchArticles } from "../../core/dao/fetch-articles.interface";

const freshdeskDomain = "https://hearlink.freshdesk.com";
const apiKey = import.meta.env.VITE_FRESHDESK_API_KEY;

export const fetchAllArticles = async ({
  folderNumber,
}: {
  folderNumber: number;
}): Promise<IFetchArticles[]> => {
  try {
    let allArticles: IFetchArticles[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const url = `${freshdeskDomain}/api/v2/solutions/folders/${folderNumber}/articles?page=${page}&per_page=${perPage}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Basic ${btoa(apiKey + ":X")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as IFetchArticles[];

      if (!Array.isArray(data)) {
        console.error("Fetched data is not an array:", data);
        break;
      }

      allArticles = allArticles.concat(data);

      if (data.length < perPage) break;

      page++;
    }
    return allArticles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error("Internal Server Error");
  }
};
