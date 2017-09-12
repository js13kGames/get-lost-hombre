!function(t,e){"function"==typeof define&&define.amd?define(["exports"],e):e("object"==typeof exports&&"string"!=typeof exports.nodeName?exports:t.TinyMusic={})}(this,function(t){function e(t){var s=t.split(c);this.frequency=e.getFrequency(s[0])||0,this.duration=e.getDuration(s[1])||0}function s(t,e,s){this.ac=t||new AudioContext,this.createFxNodes(),this.tempo=e||120,this.loop=!0,this.smoothing=0,this.staccato=0,this.notes=[],this.push.apply(this,s||[])}var i="B#-C|C#-Db|D|D#-Eb|E-Fb|E#-F|F#-Gb|G|G#-Ab|A|A#-Bb|B-Cb",o=440*Math.pow(Math.pow(2,1/12),-9),n=/^[0-9.]+$/,r=4,c=/\s+/,h=/(\d+)/,a={};i.split("|").forEach(function(t,e){t.split("-").forEach(function(t){a[t]=e})}),e.getFrequency=function(t){var e=t.split(h),s=a[e[0]],i=(e[1]||r)-r,n=o*Math.pow(Math.pow(2,1/12),s);return n*Math.pow(2,i)},e.getDuration=function(t){return n.test(t)?parseFloat(t):t.toLowerCase().split("").reduce(function(t,e){return t+("w"===e?4:"h"===e?2:"q"===e?1:"e"===e?.5:"s"===e?.25:0)},0)},s.prototype.createFxNodes=function(){var t=[["bass",100],["mid",1e3],["treble",2500]],e=this.gain=this.ac.createGain();return t.forEach(function(t,s){s=this[t[0]]=this.ac.createBiquadFilter(),s.type="peaking",s.frequency.value=t[1],e.connect(e=s)}.bind(this)),e.connect(this.ac.destination),this},s.prototype.push=function(){return Array.prototype.forEach.call(arguments,function(t){this.notes.push(t instanceof e?t:new e(t))}.bind(this)),this},s.prototype.createCustomWave=function(t,e){e||(e=t),this.waveType="custom",this.customWave=[new Float32Array(t),new Float32Array(e)]},s.prototype.createOscillator=function(){return this.stop(),this.osc=this.ac.createOscillator(),this.customWave?this.osc.setPeriodicWave(this.ac.createPeriodicWave.apply(this.ac,this.customWave)):this.osc.type=this.waveType||"square",this.osc.connect(this.gain),this},s.prototype.scheduleNote=function(t,e){var s=60/this.tempo*this.notes[t].duration,i=s*(1-(this.staccato||0));return this.setFrequency(this.notes[t].frequency,e),this.smoothing&&this.notes[t].frequency&&this.slide(t,e,i),this.setFrequency(0,e+i),e+s},s.prototype.getNextNote=function(t){return this.notes[t<this.notes.length-1?t+1:0]},s.prototype.getSlideStartDelay=function(t){return t-Math.min(t,60/this.tempo*this.smoothing)},s.prototype.slide=function(t,e,s){var i=this.getNextNote(t),o=this.getSlideStartDelay(s);return this.setFrequency(this.notes[t].frequency,e+o),this.rampFrequency(i.frequency,e+s),this},s.prototype.setFrequency=function(t,e){return this.osc.frequency.setValueAtTime(t,e),this},s.prototype.rampFrequency=function(t,e){return this.osc.frequency.linearRampToValueAtTime(t,e),this},s.prototype.play=function(t){return t="number"==typeof t?t:this.ac.currentTime,this.createOscillator(),this.osc.start(t),this.notes.forEach(function(e,s){t=this.scheduleNote(s,t)}.bind(this)),this.osc.stop(t),this.osc.onended=this.loop?this.play.bind(this,t):null,this},s.prototype.stop=function(){return this.osc&&(this.osc.onended=null,this.osc.disconnect(),this.osc=null),this},t.Note=e,t.Sequence=s});