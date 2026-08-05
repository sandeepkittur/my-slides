// https://bitbucket.lab.dynatrace.org/projects/MAR/repos/hedgehog/browse/src/components/atoms/gradient-animation/gradient-animation.js
/*
 *   Developed by Armada Content LLC
 *   Inspired by Stripe WebGl Gradient Animation
 *   Description: Dynatrace desires WebGL programming component for Dynatrace homepage,
 *   based upon AIOps End State graphic.
 *   Date: August, 2022
 */
/* eslint-disable */
import { fragment_shader } from './shaders/fragment.js'
import { vertex_shader } from './shaders/vertex.js'

class MiniGl {
  constructor(canvas, width, height) {
    const wGL = this;
    wGL.canvas = canvas;
    wGL.gl = wGL.canvas.getContext("webgl", {
      antialias: true
    })
    const context = wGL.gl;
    if (width && height) {
      this.setSize(width, height);
    }

    Object.defineProperties(wGL, {
      mat: {
        value: class {
          constructor(vertexShaders, fragments, uniforms) {
            const material = this;
            const getShaderByType = (type, source) => {
              const shader = context.createShader(type);
              return (
                context.shaderSource(shader, source),
                context.compileShader(shader),
                shader)
            }

            material.uniforms = uniforms;
            material.uniformInstances = [];

            material.vertexSource = vertexShaders;
            material.Source = `precision lowp float; ${fragments}`;

            material.vertexShader = getShaderByType(context.VERTEX_SHADER, material.vertexSource);
            material.fragmentShader = getShaderByType(context.FRAGMENT_SHADER, material.Source);
            material.program = context.createProgram();

            context.attachShader(material.program, material.vertexShader);
            context.attachShader(material.program, material.fragmentShader);

            context.linkProgram(material.program);
            material.addUniforms(null, wGL.commonUniforms);
            material.addUniforms(null, material.uniforms);
          }

          addUniforms = (name, uniforms) => {
            if (null === name) {
              Object.entries(uniforms)
                .forEach(([name, uniform]) => {
                  this.addUniforms(name, uniform)
                })
            } else if ("array" == uniforms.type) {
              uniforms.value
                .forEach((uniform, i) => {
                  this.addUniforms(`${name}[${i}]`, uniform)
                })
            } else if ("struct" == uniforms.type) {
              Object.entries(uniforms.value)
                .forEach(([uniform, i]) => {
                  return this.addUniforms(`${name}.${uniform}`, i)
                })
            } else {
              (this.uniformInstances.push({
                uniform: uniforms,
                location: context.getUniformLocation(this.program, name)
              }))
            }
          }
        }
      },
      Uniform: {
        value: class {
          constructor(p) {
            this.type = "float"
            Object.assign(this, p);
            this.typeFn = {
              float: "1f",
              int: "1i",
              vec2: "2fv",
              vec3: "3fv",
              vec4: "4fv",
              mat4: "Matrix4fv"
            }
            [this.type] || "1f";
            this.update()
          }

          update = (value) => {
            return (
              context[`uniform${this.typeFn}`](
                value,
                0 === this.typeFn.indexOf("Matrix") ? this.transpose : this.value,
                0 === this.typeFn.indexOf("Matrix") ? this.value : null)
            )
          }

          getDeclaration = (name, type, length) => {
            const uniform = this;
            if (uniform.excludeFrom !== type) {
              if ("array" === uniform.type) {
                return uniform.value[0].getDeclaration(name, type, uniform.value.length) + `\nconst int ${name}_length = ${uniform.value.length};`;
              }
              if ("struct" === uniform.type) {
                let name_no_prefix = name.replace("global_", "");
                return name_no_prefix =
                  name_no_prefix.charAt(0).toUpperCase() +
                  name_no_prefix.slice(1),
                  `uniform struct ${name_no_prefix}
                                  {\n` +
                  Object.entries(uniform.value).map(([name, uniform]) =>
                    uniform.getDeclaration(name, type)
                      .replace(/^uniform/, ""))
                    .join("")
                  + `\n} ${name}${length > 0 ? `[${length}]` : ""};`
              }
              return `uniform ${uniform.type} ${name}${length > 0 ? `[${length}]` : ""};`
            }
          }
        }
      },
      PlaneGeo: {
        value: class {
          constructor(width, height, xSegs, ySegs, orientation) {
            context.createBuffer(), this.attributes = {
              position: new wGL.Attribute({
                target: context.ARRAY_BUFFER,
                size: 3
              }),

              uvNorm: new wGL.Attribute({
                target: context.ARRAY_BUFFER,
                size: 2
              }),
              index: new wGL.Attribute({
                target: context.ELEMENT_ARRAY_BUFFER,
                size: 3,
                type: context.UNSIGNED_SHORT
              })
            }
            this.defineSurface(xSegs, ySegs)

            this.setSize(width, height, orientation)
          }

          defineSurface = (xSegs, ySegs) => {
            [this.xSegCount, this.ySegCount] = [xSegs, ySegs];
            this.vertexCount = (xSegs + 1) * (ySegs + 1);
            this.quadCount = xSegs * ySegs * 2;

            this.attributes.uvNorm.values = new Float32Array(2 * this.vertexCount);
            this.attributes.index.values = new Uint16Array(3 * this.quadCount);

            for (let y = 0; y < ySegs + 1; y++)
              for (let x = 0; x < xSegs + 1; x++) {
                const i = (y * (xSegs + 1)) + x;

                this.attributes.uvNorm.values[2 * i] = (x / xSegs) - 1;
                this.attributes.uvNorm.values[2 * i + 1] = 1 - (y / ySegs * 2);

                const s = (y * xSegs + x) * 6;

                const o = i + 1;
                const indexArray = [i, o + xSegs, o, o, o + xSegs, o + 1 + xSegs];

                for (let j = 0; j < 6; j++) {
                  this.attributes.index.values[s + j] = indexArray[j];
                }
              }

            this.attributes.uvNorm.update();
            this.attributes.index.update();
          }

          setSize = (width, height, orientation = "xy") => {
            const geometry = this;
            geometry.width = width;
            geometry.height = height;
            geometry.orientation = orientation;

            geometry.attributes.position.values = new Float32Array(3 * geometry.vertexCount);

            const o = width * -2;
            const h = height * -1;
            const segWidth = (width / geometry.xSegCount + 1);
            const segHeight = height / geometry.ySegCount;

            for (let yIndex = 0; yIndex <= geometry.ySegCount; yIndex++) {
              const t = h + yIndex * segHeight * 2;
              for (let xIndex = 0; xIndex <= geometry.xSegCount; xIndex++) {
                const r = o + xIndex * segWidth * 2;
                const l = yIndex * (geometry.xSegCount + 1) + xIndex;

                geometry.attributes.position.values[3 * l + "xyz".indexOf(orientation[0])] = r,
                  geometry.attributes.position.values[3 * l + "xyz".indexOf(orientation[1])] = t
              }
            }
            geometry.attributes.position.update();
          }
        }
      },
      Mesh: {
        value: class {
          constructor(geometry, material) {
            const mesh = this;
            mesh.geometry = geometry;
            mesh.material = material;
            mesh.attributeInstances = [];
            Object.entries(mesh.geometry.attributes)
              .forEach(([name, attribute]) => {
                mesh.attributeInstances.push({
                  attribute: attribute,
                  location: attribute.attach(name, mesh.material.program)
                })
              })
            wGL.mesh = mesh
          }

          draw = () => {
            context.useProgram(this.material.program);
            this.material.uniformInstances.forEach(({
              uniform: u,
              location: l
            }) => u.update(l)), this.attributeInstances.forEach(({
              attribute: a,
              location: l
            }) => {
              if (l >= 0) {
                a.use(l)
              }
            })

            context.drawElements(context.TRIANGLES, this.geometry.attributes.index.values.length, context.UNSIGNED_SHORT, 0)
          }
        }
      },
      Attribute: {
        value: class {
          constructor(e) {
            this.type = 5126; //float
            this.buffer = context.createBuffer();
            Object.assign(this, e);
            this.update();
          }

          update = () => {
            this.values && (context.bindBuffer(this.target, this.buffer), context.bufferData(this.target, this.values, context.STATIC_DRAW))
          }
          attach = (name, program) => {
            const n = context.getAttribLocation(program, name);
            if (n >= 0) {
              return this.target === context.ARRAY_BUFFER && (context.enableVertexAttribArray(n), context.vertexAttribPointer(n, this.size, this.type, this.normalized, 0, 0)), n
            }
          }
          use = (e) => {
            context.bindBuffer(this.target, this.buffer)
            this.target === context.ARRAY_BUFFER && (context.enableVertexAttribArray(e), context.vertexAttribPointer(e, this.size, this.type, this.normalized, 0, 0))
          }
        }
      }
    });


    wGL.commonUniforms = {
      projectionMatrix: new wGL.Uniform({
        type: "mat4",
        value: [1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1]
      }),
      modelViewMatrix: new wGL.Uniform({
        type: "mat4",
        value: [1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1]
      }),
      resolution: new wGL.Uniform({
        type: "vec2",
        value: [1., 1.]
      }),
      aspectRatio: new wGL.Uniform({
        type: "float",
        value: 1.
      })
    }
  }

  setSize = (width, height) => {
    this.width = width;
    this.height = height;

    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
    this.commonUniforms.resolution.value = [width, height];
    this.commonUniforms.aspectRatio.value = width / height;
  }

  setCamera = (right, top, bottom, near, far) => {
    this.commonUniforms.projectionMatrix.value =
      [2 / this.width, 0, 0, 0,
        0, 2 / this.height, 0, 0,
        0, 0, 2 / (near - far), 0,
        right, top, bottom, 1]
  }

}


class ColorWave {
  constructor(canvasEl) {
    this["t"] = 0;
    this["height"] = 800;
    this["amp"] = 850;
    this["freqX"] = .0002;
    this["freqY"] = .0005;
    this["color_selects"] = [1, 1, 1, 1];
    this["resize"] = () => {
      this.width = window.innerWidth;
      if (this.width > 2150) this.width = 2150;
      this.minigl.setSize(this.width, this.height);
      this.minigl.setCamera(0, 0, 0, 8, 1024);
      this.xSegCount = Math.ceil(this.width * .25);
      this.ySegCount = Math.ceil(this.height * .15);
      this.mesh.geometry.defineSurface(this.xSegCount, this.ySegCount);
      this.mesh.geometry.setSize(this.width, this.height);
    };

    this.canvasEl = canvasEl

    this["animate"] = () => {
      this.t += 95;
      this.mesh.material.uniforms.global_time.value = this.t;
      this.mesh.draw();
      requestAnimationFrame(this.animate)
    };

    this["initColorWave"] = () => {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl');
        if (!gl) return;
      } catch {
        return;
      }
      this.connect();
    }
  }

  connect = () => {
    this.shaderFiles = {
      vertex: vertex_shader,
      fragment: fragment_shader
    };
    this.minigl = new MiniGl(this.canvasEl, null, null, false)
    this.init()
  }

  initMat = () => {
    this.brandColors = [
      [0.4196078431372549, 0.2784313725490196, 0.9647058823529412],
      [0.11372549019607843, 0.43137254901960786, 0.8196078431372549],
      [0.09411764705882353, 0.8549019607843137, 0.6392156862745098],
      [0.1450980392156863, 0.27450980392156865, 0.7411764705882353]
    ];

    this.uniforms = {
      global_time: new this.minigl.Uniform({
        value: 0.0,
        type: "float"
      }),
      global_active_colors: new this.minigl.Uniform({
        value: this.color_selects,
        type: "vec4"
      }),
      global_noise_controls: new this.minigl.Uniform({
        value: {
          noiseFreq: new this.minigl.Uniform({
            value: [this.freqX, this.freqY],
            type: "vec2"
          }),
          noiseSpeed: new this.minigl.Uniform({
            value: 9.5e-7,
            type: "float"
          })
        },
        type: "struct"
      }),
      global_vert_controls: new this.minigl.Uniform({
        value: {
          noiseFreq: new this.minigl.Uniform({
            value: [18, 5],
            type: "vec2"
          }),
          noiseAmp: new this.minigl.Uniform({
            value: this.amp
          }),
          noiseSpeed: new this.minigl.Uniform({
            value: 10
          })
        },
        type: "struct",
        excludeFrom: "fragment"
      }),
      global_baseColor: new this.minigl.Uniform({
        value: this.brandColors[0],
        type: "vec3",
        excludeFrom: "fragment"
      }),
      global_waveLayers: new this.minigl.Uniform({
        value: [],
        excludeFrom: "fragment",
        type: "array"
      })
    };
    for (let colorIndex = 1; colorIndex < this.brandColors.length; colorIndex++) {
      this.uniforms.global_waveLayers.value.push(new this.minigl.Uniform({
        value: {
          color: new this.minigl.Uniform({
            value: this.brandColors[colorIndex],
            type: "vec3"
          }),
          noiseFreq: new this.minigl.Uniform({
            value: [2.75 + Math.random(colorIndex), 3.75 + Math.random(colorIndex)],
            type: "vec2"
          }),
          noiseSpeed: new this.minigl.Uniform({
            value: 11 + (.6 * colorIndex)
          }),
          noiseFlow: new this.minigl.Uniform({
            value: 6.5 + (.6 * colorIndex)
          }),
          noiseFloor: new this.minigl.Uniform({
            value: 0.0
          }),
          noiseCeil: new this.minigl.Uniform({
            value: .63 + (.07 * colorIndex)
          })
        },
        type: "struct"
      }))
    }

    return (
      new this.minigl.mat(this.shaderFiles.vertex, this.shaderFiles.fragment, this.uniforms))
  }

  init = () => {
    this.material = this.initMat();
    this.geometry = new this.minigl.PlaneGeo;
    this.mesh = new this.minigl.Mesh(this.geometry, this.material);

    this.resize();

    requestAnimationFrame(this.animate);

    window.addEventListener("resize", this.resize);
  }

}

export default ColorWave
