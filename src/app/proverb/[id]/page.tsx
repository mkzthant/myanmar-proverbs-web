import fs from 'fs';
import path from 'path';
import { Metadata } from 'next';
import Link from 'next/link';
import NativeBanner from '../../../components/NativeBanner';
import ShareActions from '../../../components/ShareActions';

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
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'proverbs_data.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const proverbs: Proverb[] = JSON.parse(jsonData);

  return proverbs.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const filePath = path.join(process.cwd(), 'public', 'proverbs_data.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const proverbs: Proverb[] = JSON.parse(jsonData);
  
  const proverbData = proverbs.find(p => p.id === params.id);
  
  if (!proverbData) {
    return { title: 'Not Found' };
  }

  return {
    title: `${proverbData.proverb.original} - မြန်မာစကားပုံ`,
    description: proverbData.meaning.my.spoken || proverbData.meaning.my.written,
    openGraph: {
      title: `${proverbData.proverb.original} - မြန်မာစကားပုံ`,
      description: proverbData.meaning.my.spoken || proverbData.meaning.my.written,
    }
  };
}

export default async function ProverbPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const filePath = path.join(process.cwd(), 'public', 'proverbs_data.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const proverbs: Proverb[] = JSON.parse(jsonData);
  
  const proverbData = proverbs.find(p => p.id === params.id);

  if (!proverbData) {
    return (
      <main className="container" style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>ရှာမတွေ့ပါ</h1>
        <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>ပင်မစာမျက်နှာသို့ ပြန်သွားရန်</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Quotation',
            text: proverbData.proverb.original,
            abstract: proverbData.meaning.my.spoken || proverbData.meaning.my.written,
            url: `https://mm-proverbs.mnote.pp.ua/proverb/${proverbData.id}`,
          }),
        }}
      />
      <div style={{ marginTop: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>
            ← နောက်သို့ (Back to Search)
          </Link>
        </div>
        
        <div className="word-card" style={{ maxWidth: '800px', margin: '0 auto', display: 'block', padding: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>{proverbData.proverb.original}</h1>
          
          <div style={{ background: 'var(--surface-hover)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>အဓိပ္ပာယ်</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              {proverbData.meaning.my.spoken || proverbData.meaning.my.written}
            </p>
          </div>

          {proverbData.story?.emotional?.my && (
            <div style={{ background: 'var(--surface-hover)', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>ပုံပြင်ဇာတ်လမ်း</h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                {proverbData.story.emotional.my}
              </p>
            </div>
          )}

          <ShareActions
            text={`${proverbData.proverb.original}\n\n${proverbData.meaning.my.spoken || proverbData.meaning.my.written}`}
            path={`/proverb/${proverbData.id}`}
          />
        </div>

        <NativeBanner
          src="https://pl30889812.effectivecpmnetwork.com/1dd8b2a7c356b115a6426e8d4dde4d02/invoke.js"
          containerId="container-1dd8b2a7c356b115a6426e8d4dde4d02"
        />
      </div>
    </main>
  );
}
