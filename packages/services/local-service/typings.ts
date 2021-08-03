export interface ApiError extends Error {
  status?: number;
}

export interface SysError extends Error {
  syscall?: string;
  code?: string;
}
