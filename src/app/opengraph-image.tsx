import { ImageResponse } from 'next/og';

export const alt = 'Juan Pablo Linares | Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#050505',
          backgroundImage:
            'radial-gradient(circle at 25% 25%, rgba(0, 112, 243, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Subtle decorative border */}
        <div
          style={{
            position: 'absolute',
            inset: '30px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            pointerEvents: 'none',
          }}
        />

        {/* Top Header Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 20px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(0, 112, 243, 0.12)',
            border: '1px solid rgba(0, 112, 243, 0.35)',
            color: '#60a5fa',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '9999px',
              backgroundColor: '#0070f3',
            }}
          />
          The Core of Logic
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '76px',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
            }}
          >
            JUAN PABLO LINARES
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 500,
              color: '#9ca3af',
              letterSpacing: '-0.01em',
            }}
          >
            Software Engineer · Backend & Full Stack Architecture
          </div>
        </div>

        {/* Bottom Tech Pills */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {['.NET 9', 'C#', 'Clean Architecture', 'CQRS', 'React', 'Next.js'].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 18px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#e5e7eb',
                  fontSize: '18px',
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
