import { ImageResponse } from 'next/og';
import { siteConfig } from '@/data/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = siteConfig.name;

/**
 * Imagem de compartilhamento gerada no build.
 * Ao receber a logo oficial, ela pode ser desenhada aqui no lugar do
 * logotipo tipográfico — mantendo a área de respiro.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#080808',
          color: '#F5F2EC',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 44,
            left: 44,
            right: 44,
            bottom: 44,
            border: '1px solid rgba(198,161,91,0.35)',
          }}
        />
        <div
          style={{
            fontSize: 22,
            letterSpacing: 14,
            textTransform: 'uppercase',
            color: '#C6A15B',
          }}
        >
          Daniel Joias
        </div>
        <div style={{ width: 80, height: 1, backgroundColor: '#C6A15B', margin: '44px 0' }} />
        <div style={{ fontSize: 58, letterSpacing: -1, color: '#F5F2EC' }}>
          O luxo está nos detalhes.
        </div>
        <div style={{ fontSize: 26, color: 'rgba(245,242,236,0.6)', marginTop: 28 }}>
          Joias em ouro e prata
        </div>
      </div>
    ),
    size,
  );
}
