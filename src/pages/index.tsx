import { readdirSync } from "fs";
import Link from "next/link";
import path from "path";

export default function Page({ pages }) {
  return (
    <>
      <div style={{ padding: "3rem" }}>
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
  console.log("experiment pages", pages);

  return {
    props: {
      title: "",
      pages,
    },
  };
}
