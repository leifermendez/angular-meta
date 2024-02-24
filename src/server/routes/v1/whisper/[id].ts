import { defineEventHandler } from 'h3';
import * as fs from 'node:fs';
import { Configuration, OpenAIApi } from 'openai';

export default defineEventHandler(async (event: any) => {
  const OPEN_AI = process.env['OPEN_AI'] as string
  const id = event.context.params.id as string;

  const configuration = new Configuration({
    apiKey: OPEN_AI,
  });

  const prompt = `Actua como un blogger experto en SEO dame un post basado en la siguiente {transcripcion_video}.
  [Instrucciones]:
  0. Se le proporcionan las siguientes partes extraídas de una transcripcion de video.
  5. incluye un único H1 al inicio
  6. incluye tantos H2 y H3 como creas necesario para satisfacer la intención de búsqueda, no es necesario que los optimices todos para palabras clave.
  7. el artículo debe ser informacional, ya que los usuarios están en el primer nivel de consciencia del customer journey, alejados de la compra.
  8. Maximiza la retención del usuario, para que terminen de leer el artículo, usa un loop abierto al inicio para generar intriga.
  9. No añadas contenido que no aporte valor, no inventes datos, todo el artículo debe ser útil.
  10. Utiliza un lenguaje directo y sencillo, que entienda un niño de 10 años.
  Devuelve el contenido en formato html y revisa que tenga formato html h1, h2 y <p>.
 `;

  const openai = new OpenAIApi(configuration);
  
  const whisper = await openai.createTranscription(
    fs.createReadStream(`${process.cwd()}/storage/${id}.mp3`) as any,
    'whisper-1'
  );

  try {
    const chat = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0301',
      temperature:0.7,
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content:`transcripcion_video=${whisper.data.text}`,
        },
      ],
    });

    const text = chat.data.choices[0].message?.content
    return { text };
    // return { text:whisper.data.text };
  } catch (e: any) {
    console.log(e.response);
    return { text: 'whisper.data.texterro' };
  }

  // return { text: whisper.data.text };
});
