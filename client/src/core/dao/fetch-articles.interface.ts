export interface IFetchArticles {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  folder_id: number;
  folder_name: string;
  category_id: number;
  category_name: string;
  thumbs_up: number;
  thumbs_down: number;
  hits: number;
}

export interface IUploadArticles {
  id: string;
  title: string;
  folder_id: number;
  thumbs_up: number;
  thumbs_down: number;
  hits: number;
  updated_at: string;
}
