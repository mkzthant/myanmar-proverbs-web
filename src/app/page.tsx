import fs from 'fs';
import path from 'path';
import ProverbsHome from '../components/ProverbsHome';

interface Proverb {
  id: string;
  proverb: { original: string };
  meaning: {
    en: string;
    my: { spoken: string; written: string };
  };
  story?: {
    emotional?: { en: string; my: string };
  };
  lexical?: {
    metadata?: { note: string; politeness: string };
  };
}

export default function Page() {
  const filePath = path.join(process.cwd(), 'public', 'proverbs_data.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const proverbs: Proverb[] = JSON.parse(jsonData);

  // Trim to only what the list view uses (~47% smaller payload than full data)
  const listData = proverbs.map((p) => ({
    id: p.id,
    proverb: { original: p.proverb.original },
    meaning: {
      en: p.meaning.en,
      my: {
        spoken: p.meaning.my.spoken,
        written: p.meaning.my.written,
      },
    },
    story: p.story?.emotional?.my
      ? { emotional: { my: p.story.emotional.my } }
      : undefined,
  }));

  return <ProverbsHome proverbs={listData} />;
}
