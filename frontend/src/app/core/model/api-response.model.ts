// Aqui se manejara de manera global los response de la api

export interface StandardResult<T> {
  success: boolean;
  errorMessage: string;
  data: T;
}

export interface PagedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  success: boolean;
  errorMessage: string;
}