/**
 * Intrinsic pixel size of an image file, read from its header.
 *
 * Content declares the width and height of every image so the browser reserves
 * the right box before the bytes arrive. If a file is regenerated at a
 * different size and the content file is not updated, the reserved box has the
 * wrong aspect ratio. Reading the real size here lets the build catch that.
 */
export function imageSize(buffer: Buffer): { width: number; height: number } {
  if (buffer.length >= 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
    return webpSize(buffer);
  }
  if (buffer.readUInt16BE(0) === 0xffd8) return jpegSize(buffer);
  throw new Error('unsupported image format');
}

function webpSize(buffer: Buffer): { width: number; height: number } {
  const format = buffer.toString('ascii', 12, 16);
  if (format === 'VP8X') {
    return {
      width: buffer.readUIntLE(24, 3) + 1,
      height: buffer.readUIntLE(27, 3) + 1,
    };
  }
  if (format === 'VP8 ') {
    // Key-frame header: 3-byte frame tag, 3-byte start code, then 14-bit sizes.
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    };
  }
  if (format === 'VP8L') {
    // 1-byte signature, then 14 bits of width-1 and 14 bits of height-1.
    const bits = buffer.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  throw new Error(`unsupported WebP variant ${format}`);
}

function jpegSize(buffer: Buffer): { width: number; height: number } {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) throw new Error('corrupt JPEG');
    const marker = buffer[offset + 1] as number;
    const length = buffer.readUInt16BE(offset + 2);
    // SOF0-SOF15, skipping the four markers in that range that are not frames.
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
    }
    offset += 2 + length;
  }
  throw new Error('no JPEG frame header');
}
