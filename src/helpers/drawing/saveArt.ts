import p5 from "p5";

export const saveArt = (p: p5, filename: string, saveKey: string = "s") => {
  if (p.key === saveKey) {
    const date = new Date();
    const time = `${date.getFullYear()}${date.getMonth()}${date.getDay()}-${date.getMilliseconds()}`;
    p.saveCanvas(`${filename}-${time}`);
  }
};
