/**
 * A helper function to format number value to Rupiah format
 * @param {number} nominal amount rupiah
 * @returns {string} Rupiah format
 */
export function toRupiah(nominal) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(nominal);
}
