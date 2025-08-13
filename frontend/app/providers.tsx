// app/providers.tsx
"use client"; // ← クライアントコンポーネントであることを宣言

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
