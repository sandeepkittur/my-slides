/* eslint-disable */
export const vertex_shader = `
    //top stuff
    precision lowp float;
    attribute vec4 position;
    attribute vec2 uvNorm;

    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    uniform vec2 resolution;
    uniform float aspectRatio;

    uniform float global_time;
    uniform vec4 global_active_colors;
    uniform struct Noise_controls {
        vec2 noiseFreq;
        float noiseSpeed;
    }
    global_noise_controls;
    uniform struct Vert_controls {
        vec2 noiseFreq;
        float noiseAmp;
        float noiseSpeed;
    }
    global_vert_controls;
    uniform vec3 global_baseColor;
    uniform struct WaveLayers {
        vec3 color;
        vec2 noiseFreq;
        float noiseSpeed;
        float noiseFlow;
        float noiseFloor;
        float noiseCeil;
    }
    global_waveLayers[3];
    const int global_waveLayers_length = 3;

    varying vec3 v_color;
    varying vec2 st;


    //noise
    //source https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83

    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }


    //blends

    vec3 blendNormal(vec3 base, vec3 blend) {
        return blend;
        }
    vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
        return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
        }

    //main

    //gausian
    float gaussian(float x) {
        return pow(50., (-1.0 * pow((x * 2.5), 2.0)));
    }

    void main() {

        float time = global_time * global_noise_controls.noiseSpeed;
        vec2 noiseCoord = resolution * uvNorm * global_noise_controls.noiseFreq;
        st = 1. - uvNorm.xy;

        float tilt = 0.;

        float seed = 35.;

        // Vertex noise
        float noise = snoise(vec3(
            noiseCoord.x * global_vert_controls.noiseFreq.x + time,
            noiseCoord.y * global_vert_controls.noiseFreq.y,
            time * global_vert_controls.noiseSpeed + seed
            )
        ) * global_vert_controls.noiseAmp;

        float center_mask = distance(abs(uvNorm.xy), vec2(0.6, .0)) * 1.1;
        float edge_mask = 1.0 - pow(abs(uvNorm.y), 2.0);
        // Fade noise to zero at edges and in center

        noise *= center_mask * edge_mask;

        vec3 pos = vec3(
                position.x + resolution.x,
                position.y  + noise * .48,
                position.z + noise
            );


        // Vertex color, to be passed to fragment shader
        if (global_active_colors[0] == 1.) {
            v_color = global_baseColor;
            }
        for (int i = 0; i < global_waveLayers_length; i++) {
            if (global_active_colors[i + 1] == 1.) {
                WaveLayers layer = global_waveLayers[i];

                float noise = smoothstep(layer.noiseFloor,
                    layer.noiseCeil,
                    snoise(vec3(noiseCoord.x * layer.noiseFreq.x + time,
                    noiseCoord.y * layer.noiseFreq.y,
                    time * layer.noiseSpeed + seed)) / 2.0 + 0.5);
                if(i == 1){
                    v_color = blendNormal(v_color, layer.color, pow(noise, 2.) * 0.7);
                }else{
                    v_color = blendNormal(v_color, layer.color, pow(noise, 2.));
                }
                }
            }

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
`
/* eslint-disable */
