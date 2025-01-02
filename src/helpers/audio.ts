export async function loadAudio(filepath: string) {
  const audioCtx = new window.AudioContext();
  try {
    const response = await fetch(filepath);

    const fileBuffer = await response.arrayBuffer();
    const audioBuffer = audioCtx.decodeAudioData(fileBuffer);
    return audioBuffer;
  } catch (err) {
    console.error(`Unable to fetch the audio file. Error: ${err.message}`);
  }
}
