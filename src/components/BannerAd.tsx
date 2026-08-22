interface BannerAdProps {
  keyId: string;
  src: string;
}

export default function BannerAd({ keyId, src }: BannerAdProps) {
  const html = `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; overflow: hidden; }
</style>
</head>
<body>
<script type="text/javascript">
  atOptions = {
    'key' : '${keyId}',
    'format' : 'iframe',
    'height' : 50,
    'width' : 320,
    'params' : {}
  };
</script>
<script src="${src}"></script>
</body>
</html>`;

  return (
    <div
      style={{
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        minHeight: '50px',
      }}
    >
      <iframe
        title="advertisement"
        srcDoc={html}
        width={320}
        height={50}
        scrolling="no"
        loading="lazy"
        style={{ border: 'none', overflow: 'hidden', display: 'block' }}
      />
    </div>
  );
}
