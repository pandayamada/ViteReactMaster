import { clearSessionsStorage } from "../../services/storage";

export function Logout() {
  // Remove items from sessionStorage
  // sessionStorage.removeItem("i18nextLng");
  clearSessionsStorage();
  return (window.location.href = "/auth/login");
}
