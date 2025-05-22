import dynamic from "next/dynamic";

const Design = dynamic(() => import("@/experiments/PixelSamplerR3"), {
  ssr: false,
});

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
