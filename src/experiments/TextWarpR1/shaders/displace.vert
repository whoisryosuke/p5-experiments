precision highp float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float time;
uniform vec2 uTex;
varying vec2 vTexCoord;
varying vec4 vVertexColor;
varying vec2 vTex;
void main() {
  // Apply the camera transform
  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);
  // Use the time to adjust the position of the vertices
  viewModelPosition.x += 10.0 * sin(time * 0.01 + viewModelPosition.y * 0.1);
  
  // Tell WebGL where the vertex goes
  gl_Position = uProjectionMatrix * viewModelPosition;
  // Pass along data to the fragment shader
  vTexCoord = aTexCoord;
  vVertexColor = aVertexColor;
  vTex = uTex;
}