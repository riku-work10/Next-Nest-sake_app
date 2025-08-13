"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Episodes App</h1>

      {session ? (
        <div>
          <p>こんにちは、{session.user?.name || session.user?.email} さん！</p>
          <button onClick={() => signOut()}>サインアウト</button>
          <br />
          <Link href="/episodes">エピソード一覧へ</Link>
        </div>
      ) : (
        <div>
          <p>ログインまたはサインアップしてください</p>
          <Link href="/login">ログイン</Link> |{" "}
          <Link href="/signup">サインアップ</Link>
        </div>
      )}
    </div>
  );
}
