export interface IFetchArticles {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  folder_id: number;
  folder_name: string;
  category_id: number;
  category_name: string;
  thumbs_up_count: number;
  thumbs_down_count: number;
  hits: number;
}

export interface IUploadArticles {
  id: string;
  name: string;
  folder_id: number;
  thumbs_up: number;
  thumbs_down: number;
  hits: number;
  updated_at: string;
}
