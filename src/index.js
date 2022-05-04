import { AnimationLoop, Model } from "@luma.gl/engine";
import { Buffer, clear } from "@luma.gl/webgl";


//shader module 
const colorShaderModule = {
    name: 'color',
    vs: `
      varying vec3 color_vColor;
  
      void color_setColor(vec3 color) {
        color_vColor = color;
      }
    `,
    fs: `
      varying vec3 color_vColor;
  
      vec3 color_getColor() {
        return color_vColor;
      }
    `
  };



const loop = new AnimationLoop({
  onInitialize({ gl }) {
    // 初期化ロジック

    //buffers
    const positionBuffer = new Buffer(
      gl,
      new Float32Array([-0.5, -0.5, 0.5, -0.5, 0.0, 0.5])
    );

    const colorBuffer = new Buffer(
      gl,
      new Float32Array([1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0])
    );
        
    const offsetBuffer = new Buffer(gl, new Float32Array([0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5]));

    //shaders
    const vs = `
        attribute vec2 position;
        attribute vec3 color;
        attribute vec2 offset;

        varying vec3 vColor;

        void main() {
            color_setColor(color); //shader module
            gl_Position = vec4(position + offset, 0.0, 1.0);
        }
    `;

    const fs = `
        varying vec3 vColor;

        void main() {
            gl_FragColor = vec4(color_getColor(), 1.0);
        }
    `;
        
        
    const model = new Model(gl, {
        vs,
        fs,
        modules: [colorShaderModule],
        attributes: {
          position: positionBuffer,
            color: colorBuffer,
            offset: [offsetBuffer, {divisor: 1}]
        },
        vertexCount: 3
      });
  
    return {model};        
        
  },

  onRender({ gl, model }) {
    // 全画面塗りつぶし
    clear(gl, { color: [0, 0, 0, 1] });
    model.draw();
      
  },
});

loop.start();
