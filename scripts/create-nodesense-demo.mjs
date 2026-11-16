// Public marketing example: entirely synthetic readings, no customer/site data.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
const w = 1914,
  h = 951;
const points = Array.from({ length: 337 }, (_, i) => {
  const t = i / 48;
  const event = (start, amplitude, rise, decay) =>
    t < start ? 0 : amplitude * (1 - Math.exp(-(t - start) / rise)) * Math.exp(-(t - start) / decay);
  return { t, level: 0.42 + event(1.35, 3.5, 0.23, 1.05) + event(4.1, 1.25, 0.2, 0.65) + 0.008 * Math.sin(i * 1.7) };
});
const max = Math.max(...points.map((p) => p.level));
const last = points.at(-1).level;
const x = (t) => 180 + (t / 7) * 1630;
const y = (v) => 785 - (v / 3) * 280;
const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(p.t).toFixed(2)},${y(p.level).toFixed(2)}`).join(' ');
const text = (x, y, value, size = 22, fill = '#183441', weight = 400) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}">${value}</text>`;
const rect = (x, y, w, h, fill = '#fff', radius = 16) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="#dce8ed"/>`;
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="header"><stop stop-color="#235784"/><stop offset="1" stop-color="#2f9abb"/></linearGradient><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#57b9d4" stop-opacity=".38"/><stop offset="1" stop-color="#57b9d4" stop-opacity=".03"/></linearGradient></defs><rect width="1914" height="951" fill="#f2f7f9"/><g font-family="Arial, sans-serif"><rect width="1914" height="80" fill="url(#header)"/>${text(44, 52, 'FluvioSense', 34, '#fff', 700)}${text(305, 50, 'NodeSense  /  Site monitoring', 22, '#e5f6fc')}${rect(1435, 20, 430, 40, '#e7f7fc', 20)}${text(1456, 47, 'DEMO · SYNTHETIC DATA', 20, '#235784', 700)}${text(48, 144, 'Demonstration Stream', 34, '#183441', 700)}${text(48, 182, 'Illustrative station · Water-level monitoring', 22, '#597480')}${rect(1555, 115, 310, 58, '#fff', 12)}${text(1582, 152, 'Sample period: 7 days', 21, '#315d72', 600)}${rect(48, 212, 136, 48, '#dceff6', 10)}${text(70, 244, 'Overview', 21, '#236d94', 700)}${text(220, 244, 'Site data', 21, '#647f8b')}`;
const cards = [
  ['LATEST LEVEL', `${last.toFixed(2)} m`, 'End of sample period'],
  ['EVENT PEAK', `${max.toFixed(2)} m`, 'Synthetic rainfall response'],
  ['SAMPLE INTERVAL', '30 min', 'Regular demonstration readings'],
];
cards.forEach(([label, value, note], i) => {
  const left = 48 + i * 610;
  svg +=
    rect(left, 286, 590, 118) +
    text(left + 24, 318, label, 17, '#64808d', 700) +
    text(left + 24, 360, value, 34, '#256e92', 700) +
    text(left + 260, 360, note, 19, '#64808d');
});
svg +=
  rect(48, 430, 1818, 455) +
  text(78, 470, 'Water level (m)', 24, '#183441', 700) +
  text(1465, 470, '●  Demonstration sensor', 20, '#267da4');
for (let v = 0; v <= 3; v += 0.5) {
  svg += `<path d="M180 ${y(v)}H1810" stroke="#e3edf1"/>` + text(117, y(v) + 7, v.toFixed(1), 18, '#647f8b');
}
for (let d = 0; d <= 7; d++) {
  svg += `<path d="M${x(d)} 490V785" stroke="#edf2f5"/>` + text(x(d) - 23, 823, `Day ${d}`, 18, '#647f8b');
}
svg += `<path d="${line} L1810 785 L180 785Z" fill="url(#area)"/><path d="${line}" fill="none" stroke="#2688b4" stroke-width="4" stroke-linejoin="round"/>`;
svg +=
  text(78, 862, 'A clear rise, event peak and gradual recession across the sample period.', 19, '#647f8b') +
  text(
    48,
    925,
    'Illustrative interface · All site names and readings are synthetic. Not for operational use.',
    20,
    '#597480'
  ) +
  '</g></svg>';
await writeFile('/tmp/nodesense-demo.svg', svg);
await sharp(Buffer.from(svg), { density: 144 }).png().toFile('src/assets/images/fluvio/nodesense-demo-timeseries.png');
