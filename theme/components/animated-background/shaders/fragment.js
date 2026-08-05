/* eslint-disable */
export const fragment_shader = `
    //common uniforms
    uniform mat4 projectionMatrix;
    uniform mat4 modelViewMatrix;
    uniform vec2 resolution;
    uniform float aspectRatio;

    //uniforms
    uniform float global_time;
    uniform vec4 global_active_colors;
    uniform struct Noise_controls{
        vec2 noiseFreq;
        float noiseSpeed;
    }
    global_noise_controls;

    varying vec3 v_color;
    varying vec2 st; // texture positions
        void main() {
            gl_FragColor = vec4(v_color, 1.0);
        }`
/* eslint-disable */
