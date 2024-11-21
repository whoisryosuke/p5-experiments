import dynamic from "next/dynamic";

const Design = dynamic(
  () => import("@/experiments/NoiseScalePatternR2/NoiseScalePatternR2"),
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
