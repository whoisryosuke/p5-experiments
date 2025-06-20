import dynamic from "next/dynamic";

const Design = dynamic(
  () => import("@/experiments/PaintMusicR1/PaintMusicR1"),
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
