import { clearLocalStorage } from "../../services/storage";

export function Logout() {
  // Remove items from sessionStorage
  // sessionStorage.removeItem("i18nextLng");
  clearLocalStorage();
  return (window.location.href = "/auth/login");
}
