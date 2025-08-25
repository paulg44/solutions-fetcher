export interface IFetchCategories {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  icon: {
    id: number;
    name: string;
    content_type: string;
    size: number;
    created_at: string;
    updated_at: string;
    attachment_url: string;
    thumb_url: string;
  };
}

export interface IUploadCategories {
  id: string[];
  name: string[];
}
