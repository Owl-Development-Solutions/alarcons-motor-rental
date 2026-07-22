export interface Paginated {
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  current_page: number;
  links: PaginatedReponseLinks;
}

export interface PaginatedReponseLinks {
  url: string;
  label: string;
  page: number;
  active: boolean;
}
