import type { ReactNode } from "react";

export interface AuthGuardProps {
  component: ReactNode;
  permissionAccess?: boolean;
  isCustomFullPage?: boolean;
}
