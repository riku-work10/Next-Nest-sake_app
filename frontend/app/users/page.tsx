"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const fetchUsers = async () => {
    const res = await api.get<User[]>("/users");
    setUsers(res.data);
  };

  const createUser = async () => {
    await api.post("/users", { email, name });
    setEmail("");
    setName("");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Users</h1>

      <div>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={createUser}>Create</button>
      </div>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.id}: {u.email} ({u.name || "No name"})
          </li>
        ))}
      </ul>
    </div>
  );
}
