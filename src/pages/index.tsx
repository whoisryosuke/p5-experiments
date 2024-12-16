import KeyboardUI from "@/components/KeyboardUI/KeyboardUI";
import MusicTeacher from "@/features/MusicTeacher/MusicTeacher";
import { readdirSync } from "fs";
import Link from "next/link";
import path from "path";

export default function Page() {
  return (
    <>
      <div style={{ padding: "3rem" }}>
        <h1>Experiments</h1>
        <MusicTeacher />
        <KeyboardUI type="app" style={{ width: "100%" }} />
        <KeyboardUI type="user" />
      </div>
    </>
  );
}
