export interface UserFilterModel {
  search?: string,
  registerDateFrom?: Date | null,
  registerDateTo?: Date | null,
  totalSaleFrom?: number | null,
  totalSaleTo?: number | null,
  page: number,
  limit: number,
}
