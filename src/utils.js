import os from "node:os";
import path from "node:path";

const PLATFORM_KV = {
  darwin: 'osx',
  linux: 'linux',
  win32: 'win',
};

const ARCH_KV = {
  x64: 'x64',
  ia32: 'ia32',
  arm64: 'arm64',
};

const CACHE_DIR=path.join(os.homedir(), '.nw-cli', 'cache');

export default {
    PLATFORM_KV,
    ARCH_KV,
    CACHE_DIR,
}
