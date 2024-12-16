import KeyboardUI from "@/components/KeyboardUI/KeyboardUI";
import { readdirSync } from "fs";
import Link from "next/link";
import path from "path";

export default function Page() {
  return (
    <>
      <div style={{ padding: "3rem" }}>
        <h1>Experiments</h1>
        <KeyboardUI />
      </div>
    </>
  );
}
