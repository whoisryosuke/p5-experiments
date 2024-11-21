import dynamic from "next/dynamic";

const BasicPattern = dynamic(
  () => import("@/experiments/BasicPattern/BasicPattern"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <BasicPattern />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "",
    },
  };
}
