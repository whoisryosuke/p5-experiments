import dynamic from "next/dynamic";

const Design = dynamic(() => import("@/experiments/TextWarpR1/TextWarpR1"), {
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
