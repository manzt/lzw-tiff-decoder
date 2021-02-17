import wasm from '../Cargo.toml';

let wasmModule;
export async function decompress(src, max_uncompressed_size) {
  if (!wasmModule) wasmModule = await wasm(); // only init wasm once

  const decoded = wasmModule.decompress(src, max_uncompressed_size);

  if (decoded.length === 0) {
    throw Error("Failed to decode with LZW decoder.")
  }

  return decoded;
}
