import { readdirSync } from "fs";
import Link from "next/link";
import path from "path";

export default function Page({ pages }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          inset: 0,
          padding: "3rem",
          overflowY: "scroll",
        }}
      >
        <h1>Experiments</h1>
        <ul>
          {pages.map((page) => (
            <li key={page}>
              <Link href={`/experiments/${page}`}>
                {page.replace("-", " ")}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const experimentPath = path.join("./src/pages/experiments");
  const experimentPages = readdirSync(experimentPath);
  const pages = experimentPages.map((page) => page.replace(".tsx", ""));

  return {
    props: {
      title: "",
      pages,
    },
  };
}
