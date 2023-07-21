import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';
const soundsPath = path.join(__dirname, '../../../../public/sounds');

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const folders = fs.readdirSync(soundsPath);
  const result = [];
  for (const folder of folders) {
    const me = {
      name: folder,
      sounds: [],
    }
    const files = fs.readdirSync(`${soundsPath}/${folder}`);
    // first, get prefix
    let prefix = '';
    for (const file of files) {
      if (!prefix)
        prefix = file;

      if (file.length < prefix.length) {
        prefix = file;
      }


      for (let i = 0; i < prefix.length; i++) {
        if (prefix[i] !== file[i]) {
          prefix = prefix.slice(0, i);
          break;
        }
      }
    }
    console.log('prefix is',prefix);

    for (const file of files) {
      const path = `/sounds/${folder}/${file}`;
      const name = file.slice(prefix.length, file.length - 4).trim();
      me.sounds.push({
        name,
        path,
      });
    }

    result.push(me);
  }
  res.status(200).json({
    sounds: result,
  })
}
