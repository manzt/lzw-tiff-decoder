## `lzw-tiff-decoder`

A WASM-based LZW decoder for tiff images... 

## Installation

```bash
$ npm install lzw-tiff-decoder
```

## Usage

```javascript
import { decompress } from 'lzw-tiff-decoder';

const compressedBytes = new Uint8Array(/* tile or strip from tiff */);
const maxUncompressedSize = tileWidth * tileHeight * bitsPerSample / 8;

const decoded = await decompress(compressedBytes, maxUncompressedSize);
```

## Development

```bash
$ cd js && npm install
$ npm run build
```
