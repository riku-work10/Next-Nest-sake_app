"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Episode } from "@/types";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function EpisodesPage() {
  const { data: session } = useSession();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // エピソード一覧取得
  const fetchEpisodes = async () => {
    try {
      const res = await api.get<Episode[]>("/episodes");
      setEpisodes(res.data);
    } catch (err) {
      console.error("Fetch episodes error:", err);
    }
  };

  // エピソード作成
  const createEpisode = async () => {
    if (!session) return alert("ログインしてください");
    if (!title || !content) return alert("タイトルと内容を入力してください");

    try {
      await api.post("/episodes", { title, content });
      setTitle("");
      setContent("");
      fetchEpisodes();
    } catch (err) {
      console.error("Create episode error:", err);
    }
  };

  // エピソード削除
  const deleteEpisode = async (id: number) => {
    if (!confirm("本当に削除しますか？")) return;
    try {
      await api.delete(`/episodes/${id}`);
      fetchEpisodes();
    } catch (err) {
      console.error("Delete episode error:", err);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Episodes</h1>

      {/* ログインユーザーのみ作成フォーム表示 */}
      {session && (
        <div style={{ marginBottom: "2rem" }}>
          <h2>新規エピソード作成</h2>
          <input
            placeholder="タイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            placeholder="内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <button onClick={createEpisode}>作成</button>
        </div>
      )}

      <ul>
        {episodes.map((ep) => (
          <li key={ep.id} style={{ marginBottom: "1rem" }}>
            <Link href={`/episodes/${ep.id}`} style={{ fontWeight: "bold" }}>
              {ep.title}
            </Link>{" "}
            by {ep.user?.name || ep.user?.email}
            <br />
            {ep.content}
            <br />
            {/* ログインユーザーで自分の投稿のみ削除可能 */}
            {session?.user?.email === ep.user?.email && (
              <button onClick={() => deleteEpisode(ep.id)}>削除</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
