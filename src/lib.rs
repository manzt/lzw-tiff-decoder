use wasm_bindgen::prelude::*;
use weezl;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// Adapted from: https://github.com/image-rs/image-tiff/blob/4900c8287193158e0c9b391b0586a5aa4be23ba3/src/decoder/stream.rs#L301-L353
#[wasm_bindgen]
pub fn decompress(compressed: &[u8], max_uncompressed_length: usize) -> Vec<u8> {
    let mut decoder = weezl::decode::Decoder::with_tiff_size_switch(weezl::BitOrder::Msb, 8);
    let mut uncompressed = Vec::with_capacity(max_uncompressed_length);
    let mut bytes_read = 0;

    while uncompressed.len() < max_uncompressed_length {
        let bytes_written = uncompressed.len();

        // Resize vector only if needed
        uncompressed.reserve(1 << 12);
        let buffer_space = uncompressed.capacity().min(max_uncompressed_length);
        // Initialize unwritten bytes with zeros
        uncompressed.resize(buffer_space, 0u8);

        // Decode unread portion into unwritten
        let result = decoder.decode_bytes(
            &compressed[bytes_read..],
            &mut uncompressed[bytes_written..],
        );

        bytes_read += result.consumed_in;
        uncompressed.truncate(bytes_written + result.consumed_out);

        if let Ok(weezl::LzwStatus::Done) = result.status {
            // Just check if it's finished.
            break;
        }
    }

    uncompressed
}
