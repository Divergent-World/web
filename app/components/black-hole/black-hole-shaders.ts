export const BLACK_HOLE_VERTEX_SHADER = `
  varying vec3 vLocalPosition;
  varying vec3 vWorldPosition;
  varying vec3 vWorldTangent;
  varying vec3 vViewPosition;
  varying vec3 vViewNormal;

  void main() {
    vLocalPosition = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    vWorldPosition = worldPosition.xyz;
    vec2 tangentDirection = vec2(-position.y, position.x);
    float tangentLength = max(length(tangentDirection), 0.0001);
    vec3 localTangent = vec3(tangentDirection / tangentLength, 0.0);
    vWorldTangent = normalize((modelMatrix * vec4(localTangent, 0.0)).xyz);
    vViewPosition = viewPosition.xyz;
    vViewNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * viewPosition;
  }
`

export const ACCRETION_FRAGMENT_SHADER = `
  uniform float uTime;
  uniform float uReducedMotion;
  uniform float uInnerRadius;
  uniform float uOuterRadius;
  uniform float uLayer;
  uniform float uMotionRate;
  uniform float uDopplerMinimum;
  uniform float uDopplerMaximum;
  uniform vec3 uInnerColor;
  uniform vec3 uMidColor;
  uniform vec3 uOuterColor;
  uniform vec3 uRimColor;
  varying vec3 vLocalPosition;
  varying vec3 vWorldPosition;
  varying vec3 vWorldTangent;

  float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float valueNoise(vec2 point) {
    vec2 cell = floor(point);
    vec2 fraction = fract(point);
    fraction = fraction * fraction * (3.0 - 2.0 * fraction);
    return mix(
      mix(hash(cell), hash(cell + vec2(1.0, 0.0)), fraction.x),
      mix(
        hash(cell + vec2(0.0, 1.0)),
        hash(cell + vec2(1.0)),
        fraction.x
      ),
      fraction.y
    );
  }

  float fbm(vec2 point) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int octave = 0; octave < 3; octave++) {
      value += valueNoise(point) * amplitude;
      point = point * 2.03 + vec2(17.0, 11.0);
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 point = vLocalPosition.xy;
    float radius = length(point);
    float radial = clamp(
      (radius - uInnerRadius) / (uOuterRadius - uInnerRadius),
      0.0,
      1.0
    );
    float angle = atan(point.y, point.x);
    float motion = uTime * (1.0 - uReducedMotion) * uMotionRate;
    float domainWarp = fbm(
      vec2(radial * 5.0, angle * 1.4 + uLayer * 7.3)
    );
    float coarseBands = sin(
      radial * 82.0 + angle * 5.0 + domainWarp * 15.0 - motion * 0.55
    );
    float fineBands = sin(
      radial * 198.0 - angle * 11.0 + domainWarp * 24.0 - motion
    );
    float radialBands = mix(
      coarseBands,
      fineBands,
      0.38 + uLayer * 0.22
    );
    float angularShear = sin(
      angle * 17.0 - motion * 0.72 + radial * 41.0 + domainWarp * 7.0
    );
    float filament = smoothstep(
      -0.44,
      0.74,
      radialBands * 0.54 + angularShear * 0.46
    );
    float flowNoise = fbm(
      vec2(
        angle * 3.2 - motion * 0.2,
        radial * 16.0 + uLayer * 4.0
      )
    );
    float brokenFlow = smoothstep(0.18, 0.84, flowNoise);
    float dustBreakup = mix(
      1.0,
      smoothstep(
        0.28,
        0.76,
        flowNoise + sin(angle * 9.0 + radial * 31.0) * 0.12
      ),
      uLayer
    );
    float hotCore = (1.0 - uLayer) *
      (1.0 - smoothstep(0.0, 0.24, radial)) *
      mix(0.58, 1.0, brokenFlow);
    float envelope = smoothstep(0.0, 0.045, radial) *
      (1.0 - smoothstep(0.78, 1.0, radial));
    float flowingFilaments = filament *
      mix(0.34, 1.0, brokenFlow) *
      dustBreakup;
    float density = max(flowingFilaments, hotCore * 0.88) * envelope;
    float energy = pow(1.0 - radial, 1.55);
    vec3 color = mix(uOuterColor, uMidColor, energy);
    color = mix(color, uInnerColor, pow(energy, 2.3));

    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    float approach = dot(normalize(vWorldTangent), viewDirection) * 0.5 + 0.5;
    float doppler = mix(uDopplerMinimum, uDopplerMaximum, approach);
    color *= doppler;

    float chromatic = smoothstep(0.72, 0.98, filament) *
      (1.0 - smoothstep(0.0, 0.08, radial));
    color = mix(color, uRimColor, chromatic * 0.16);
    float layerOpacity = mix(0.92, 0.48, uLayer);
    float alpha = density * layerOpacity;
    if (alpha < 0.018) discard;
    gl_FragColor = vec4(color, alpha);
  }
`

export const LENSING_FRAGMENT_SHADER = `
  uniform vec3 uInnerColor;
  uniform vec3 uMidColor;
  uniform vec3 uRimColor;
  varying vec3 vViewPosition;
  varying vec3 vViewNormal;

  void main() {
    vec3 viewDirection = normalize(-vViewPosition);
    float facing = abs(dot(normalize(vViewNormal), viewDirection));
    float fresnel = pow(1.0 - clamp(facing, 0.0, 1.0), 3.2);
    float horizontal = clamp(vViewNormal.x, -1.0, 1.0);
    float vertical = clamp(vViewNormal.y, -1.0, 1.0);
    float roundedArch = sqrt(max(0.0, 1.0 - horizontal * horizontal));
    float curve = 0.10 + 0.44 * roundedArch;
    float primaryArc = 1.0 - smoothstep(
      0.025,
      0.075,
      abs(vertical - curve)
    );
    float secondaryArc = 1.0 - smoothstep(
      0.025,
      0.075,
      abs(vertical + curve * 0.72)
    );
    float arcMask = clamp(primaryArc + secondaryArc * 0.36, 0.0, 1.0);
    float arcVisibility = mix(0.28, 1.0, fresnel);
    float rearFlow = arcMask * arcVisibility;
    float photonRim = smoothstep(0.22, 0.92, fresnel);
    float photonMask = mix(0.012, 0.34, arcMask);
    vec3 color = mix(uMidColor, uInnerColor, primaryArc);
    color = mix(color, uRimColor, photonRim * 0.42);
    float alpha = rearFlow * 0.92 + photonRim * photonMask;
    if (alpha < 0.015) discard;
    gl_FragColor = vec4(color, alpha);
  }
`
