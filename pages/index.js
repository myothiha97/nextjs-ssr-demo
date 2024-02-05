import Image from "next/image";
import { Afacad, Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data: todos = [] }) {
  const loading = !todos?.length;
  const sortedTodos = todos?.sort((t) => (t?.completed ? -1 : 1));

  console.log({ todos });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>Here is the list of todos</p>
            <div className="flex flex-col gap-5">
              {sortedTodos?.map((t) => (
                <div key={t?.id} className="flex gap-3">
                  <span>{t?.title}</span>
                  <span
                    style={{
                      background: t?.completed ? "blue" : "red",
                      color: "white",
                    }}
                  >
                    {t?.completed ? "done" : "not completed"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

// export
