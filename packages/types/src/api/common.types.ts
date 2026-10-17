// =============================================================================
// Common API Types
// =============================================================================

export type RequestId = string;

/** Pagination parameters */
export interface PaginationParams {
  readonly page: number; // 1-indexed
  readonly limit: number; // max 100
}

/** Paginated response wrapper */
export interface PaginatedResponse<T> {
  readonly data: T[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
    readonly hasNextPage: boolean;
    readonly hasPreviousPage: boolean;
  };
}

/** Sort direction */
export type SortDirection = "asc" | "desc";

export interface SortParams {
  readonly field: string;
  readonly direction: SortDirection;
}
