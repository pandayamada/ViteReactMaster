

import { getSessionsStorage } from "../../services/storage";
import type { UserInfo } from "./user.config";

const userInfo = JSON.parse(getSessionsStorage("user") || "null") as UserInfo | null;


export const systemsRole = {
    admin: "admin",
    operator: "operator",
};


export const permissionAction = {
    Home: userInfo?.role === systemsRole.admin || userInfo?.role === systemsRole.operator,
    Contract: userInfo?.role === systemsRole.admin || userInfo?.role === systemsRole.operator
}