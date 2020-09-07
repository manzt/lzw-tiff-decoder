import wasm from '../Cargo.toml';

let decompress;

class LZWDecoder {

  async decompress(src, max_uncompressed_size) {

    if (!decompress) {
      // Only init wasm when needed
      const mod = await wasm();
      decompress = mod.decompress;
    } 

    const decoded = decompress(src, max_uncompressed_size);

    if (decoded.length === 0) {
      throw Error("Failed to decode with LZW decoder.")
    }

    return decoded;
  }
}

export default LZWDecoder;
