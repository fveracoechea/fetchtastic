import fs from 'fs';
import { STATUS_CODES } from 'http';

const entries: [number, string][] = [];

for (const code in STATUS_CODES) {
  entries.push([Number(code), STATUS_CODES[code] ?? '']);
}

fs.writeFileSync(
  'src/utils/status-codes.ts',
  `
  export const StatusCodes = new Map<number, string>(${JSON.stringify(entries, null, 2)})
`,
);
