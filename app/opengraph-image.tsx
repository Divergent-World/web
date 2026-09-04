import { ImageResponse } from 'next/og'

export const alt = 'Divergent World — Create gravity.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#080706',
          color: '#f3eadc',
        }}
      >
        <div style={{ position: 'absolute', left: -80, top: -120, display: 'flex', width: 620, height: 620, borderRadius: '50%', background: 'rgba(104, 40, 39, 0.22)' }} />
        <div style={{ position: 'absolute', right: -140, bottom: -180, display: 'flex', width: 720, height: 720, borderRadius: '50%', background: 'rgba(185, 133, 80, 0.13)' }} />
        <div style={{ position: 'absolute', left: 130, top: 150, display: 'flex', width: 330, height: 330, alignItems: 'center', justifyContent: 'center', border: '2px solid #684633', borderRadius: '50%', boxShadow: '0 0 64px #684633' }}>
          <div style={{ display: 'flex', width: 270, height: 270, alignItems: 'center', justifyContent: 'center', border: '7px solid #dfb77d', borderRadius: '50%', boxShadow: '0 0 34px #dfb77d' }}>
            <div style={{ display: 'flex', width: 220, height: 220, border: '2px solid #f0d9bd', borderRadius: '50%', background: '#000000', boxShadow: '0 0 22px #fff8e8' }} />
          </div>
        </div>
        <div style={{ position: 'absolute', top: 76, right: 82, display: 'flex', fontFamily: 'Arial, sans-serif', fontSize: 18, letterSpacing: '0.28em', textTransform: 'uppercase' }}>
          Divergent.World
        </div>
        <div style={{ position: 'absolute', right: 80, bottom: 94, display: 'flex', width: 620, flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', fontFamily: 'Georgia, serif', fontSize: 94, letterSpacing: '-0.055em', lineHeight: 1 }}>
            Create gravity.
          </div>
          <div style={{ display: 'flex', marginTop: 25, color: 'rgba(243, 234, 220, 0.66)', fontFamily: 'Arial, sans-serif', fontSize: 22, letterSpacing: '0.04em' }}>
            A learning organization for doers.
          </div>
        </div>
      </div>
    ),
    size,
  )
}
