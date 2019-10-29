class Helpers {
  generateHex(len) {
    let maxlen = 8;
    let min = Math.pow(16,Math.min(len,maxlen)-1);
    let max = Math.pow(16,Math.min(len,maxlen)) - 1;
    let n   = Math.floor( Math.random() * (max-min+1) ) + min;
    let r   = n.toString(16);
    while ( r.length < len ) { r = r + this.generateHex( len - maxlen ); }
    return r;
  };

}

export default Helpers
