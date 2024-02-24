import { defineEventHandler } from 'h3';
import * as ytdl from 'ytdl-core';
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg';
import * as ffmpegRaw from 'fluent-ffmpeg';

export default defineEventHandler(async (event:any) => {
  const id = event.context.params.id as string
  const yt = (ytdl as any).default;
  const ffmpeg = (ffmpegRaw as any).default;
  ffmpeg.setFfmpegPath(ffmpegPath.path);

  let stream = yt(id, {
    quality: 'highestaudio',
  });

  let start = Date.now();

  const wrapperPromise = () => {
    return new Promise((resolve, reject) => {
      ffmpeg(stream)
        .audioBitrate(128)
        .save(`${process.cwd()}/storage/${id}.mp3`)
        .on('progress', (p: any) => {
          process.stdout.write(`${p.targetSize}kb downloaded`);
        })
        .on('end', () => {
          resolve(true);
          console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
        });
    });
  };

  let info = await yt.getInfo(id);

  await wrapperPromise()

  return { message: 'Hello video', info:info.videoDetails };
});
