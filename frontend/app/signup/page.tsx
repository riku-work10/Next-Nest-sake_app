"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Nest.js API にユーザー作成
      await axios.post("http://localhost:3001/auth/register", {
        email,
        name,
        password,
      });

      // 登録後すぐログイン
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("ログイン失敗: " + res.error);
      } else {
        router.push("/episodes"); // サインアップ後遷移
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "登録失敗");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>サインアップ</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">サインアップ</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        アカウントがある場合は <a href="/login">ログイン</a>
      </p>
    </div>
  );
}
