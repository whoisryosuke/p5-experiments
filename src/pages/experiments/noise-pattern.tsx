import dynamic from "next/dynamic";

const Design = dynamic(
  () => import("@/experiments/NoisePattern/NoisePattern"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <Design />
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
