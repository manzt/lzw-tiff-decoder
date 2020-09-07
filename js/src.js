import wasm from '../Cargo.toml';

let decompress;

class LZWDecoder {

  async decompress(src, max_uncompressed_size) {

    if (!decompress) {
      const mod = await wasm();
      decompress = mod.decompress;
    } 

    return decompress(src, max_uncompressed_size);
  }
}

export default LZWDecoder;
