import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: '#080706' }}>
        <div style={{ display: 'flex', width: 128, height: 128, alignItems: 'center', justifyContent: 'center', border: '3px solid #684633', borderRadius: '50%', boxShadow: '0 0 25px #684633' }}>
          <div style={{ display: 'flex', width: 104, height: 104, alignItems: 'center', justifyContent: 'center', border: '5px solid #dfb77d', borderRadius: '50%', boxShadow: '0 0 15px #dfb77d' }}>
            <div style={{ display: 'flex', width: 78, height: 78, border: '2px solid #f0d9bd', borderRadius: '50%', background: '#000000', boxShadow: '0 0 10px #fff8e8' }} />
          </div>
        </div>
      </div>
    ),
    size,
  )
}
