"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Episode, User } from "@/types";
import Link from "next/link";

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchEpisodes = async () => {
    const res = await api.get<Episode[]>("/episodes");
    setEpisodes(res.data);
  };

  const fetchUsers = async () => {
    const res = await api.get<User[]>("/users");
    setUsers(res.data);
  };

  const createEpisode = async () => {
    await api.post("/episodes", { userId, title, content });
    setTitle("");
    setContent("");
    fetchEpisodes();
  };

  useEffect(() => {
    fetchEpisodes();
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Episodes</h1>

      <div>
        <select onChange={(e) => setUserId(Number(e.target.value))}>
          <option value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name || u.email}
            </option>
          ))}
        </select>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={createEpisode}>Create</button>
      </div>

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
            <button
              onClick={async () => {
                if (confirm("本当に削除しますか？")) {
                  await api.delete(`/episodes/${ep.id}`);
                  fetchEpisodes();
                }
              }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>


    </div>
  );
}
