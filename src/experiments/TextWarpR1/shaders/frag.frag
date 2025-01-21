precision highp float;
varying vec2 vTex;
varying vec2 vTexCoord;

void main() {
  vec4 myColor = vec4(vTexCoord.x, vTexCoord.y, 0.0, 1.0);
  gl_FragColor = myColor;
}