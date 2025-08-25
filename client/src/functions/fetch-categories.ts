import type { IFetchCategories } from "./function-types/fetch-categories.interface";

const freshdeskDomain = "https://hearlink.freshdesk.com";
const apiKey = import.meta.env.VITE_FRESHDESK_API_KEY;

export const fetchCategories = async (): Promise<IFetchCategories[]> => {
  try {
    const url = `${freshdeskDomain}/api/v2/solutions/categories/en`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(apiKey + ":X"),
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }

    const categories = (await response.json()) as IFetchCategories[];
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Internal Server Error");
  }
};

export default fetchCategories;
