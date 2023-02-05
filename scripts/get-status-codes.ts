const fs = require('fs');
const { STATUS_CODES } = require('http');

const entries: [number, string][] = [];

for (let code in STATUS_CODES) {
  entries.push([Number(code), STATUS_CODES[code]]);
}

fs.writeFileSync(
  'src/status-codes.ts',
  `
  export const StatusCodes = new Map<number, string>(${JSON.stringify(
    entries,
    null,
    2,
  )})
`,
);
