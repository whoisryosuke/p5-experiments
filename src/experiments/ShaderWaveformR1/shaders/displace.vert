precision highp float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform float time;
uniform float waveform[1024];
// robust util to map value 
float map( float v, float in_min, float in_max, float out_min, float out_max ) {
	// normalisation in range[in_min,in_max]
	float norm = 0.0;
	if ( in_min < in_max ) {
		norm = min(in_max,max(in_min,v)) - in_min;
		norm /= (in_max-in_min);
	} else if ( in_min > in_max ) {
		norm = min(in_min,max(in_max,v)) - in_max;
		norm /= (in_min-in_max);
		norm = 1.0-norm;
	}
	// mapping in range [out_min,out_max]
	float result = norm * (out_max-out_min) + out_min;
	float mmin = out_min;
	float mmax = out_max;
	if ( out_min > out_max ) {
		mmin = out_max;
		mmax = out_min;
		result = (1.-norm) * (out_min-out_max) + out_max;
	}
	// clamping value
	return min(mmax,max(mmin,result));
}


void main() {
  // Apply the camera transform
  vec4 viewModelPosition = uModelViewMatrix * vec4(aPosition, 1.0);
  // Use the time to adjust the position of the vertices
  // viewModelPosition.x += 10.0 * sin(time * 0.01 + viewModelPosition.y * 0.1);
  highp int waveformId = int(viewModelPosition.x + 50.0 + viewModelPosition.y + 50.0);
  float waveformData = waveform[waveformId];
  float waveformDataMapped = map(waveformData, 0.0, 256.0, 0.0, 100.0);
  // float waveformData = waveform[gl_VertexID];
  // viewModelPosition.z += waveformData;
  viewModelPosition.z += waveformDataMapped;
  // viewModelPosition.x += 10.0 * sin(time * 0.01 + viewModelPosition.y * 0.1) + waveformDataMapped;
    
  // Tell WebGL where the vertex goes
  gl_Position = uProjectionMatrix * viewModelPosition;
}