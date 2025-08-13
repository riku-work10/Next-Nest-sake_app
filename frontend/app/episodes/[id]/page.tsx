"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Episode } from "@/types";

export default function EpisodeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchEpisode = async () => {
    const res = await api.get<Episode>(`/episodes/${id}`);
    setEpisode(res.data);
    setTitle(res.data.title);
    setContent(res.data.content);
  };

  const updateEpisode = async () => {
    await api.put(`/episodes/${id}`, { title, content, userId: episode?.userId });
    alert("更新しました");
    fetchEpisode();
  };

  useEffect(() => {
    fetchEpisode();
  }, [id]);

  if (!episode) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Episode Detail</h1>
      <p>ID: {episode.id}</p>
      <p>User: {episode.user?.name || episode.user?.email}</p>
      <p>Created At: {new Date(episode.createdAt).toLocaleString()}</p>

      <h3>編集フォーム</h3>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
      />
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="内容"
      />
      <br />
      <button onClick={updateEpisode}>更新</button>
      <button onClick={() => router.push("/episodes")}>戻る</button>
    </div>
  );
}
