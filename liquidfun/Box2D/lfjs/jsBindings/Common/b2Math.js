var FLT_EPSILON = 1.19209290E-07;

function b2Max(a ,b) {
  return new b2Vec2(Math.max(a.x, b.x), Math.max(a.y, b.y));
}

function b2Min(a, b) {
  return new b2Vec2(Math.min(a.x, b.x), Math.min(a.y, b.y));
}

function b2Clamp(a, low, high) {
  return b2Max(low, b2Min(a, high));
}


/** @constructor */
function b2Vec2(x, y) {
  if (x === undefined) {
    x = 0;
  }
  if (y === undefined) {
    y = 0;
  }
  this.x = x;
  this.y = y;
}

// static functions on b2Vec2
b2Vec2.Add = function(out, a, b) {
  out.x = a.x + b.x;
  out.y = a.y + b.y;
};

b2Vec2.CrossScalar = function(output, input, scalar) {
  output.x = -scalar * input.y;
  output.y =  scalar * input.x;
};

b2Vec2.Cross = function(a, b) {
  return a.x * b.y - a.y * b.x;
};

b2Vec2.MulScalar = function(out, input, scalar) {
  out.x = input.x * scalar;
  out.y = input.y * scalar;
};

b2Vec2.Mul = function(out, T, v) {
  var Tp = T.p;
  var Tqc = T.q.c;
  var Tqs = T.q.s;

  var x = v.x;
  var y = v.y;

  out.x = (Tqc * x - Tqs * y) + Tp.x;
  out.y = (Tqs * x + Tqc * y) + Tp.y;
};

b2Vec2.Normalize = function(out, input) {
  var length = input.Length();
  if (length < FLT_EPSILON) {
    out.x = 0;
    out.y = 0;
    return;
  }
  var invLength = 1.0 / length;
  out.x = input.x * invLength;
  out.y = input.y * invLength;
};

b2Vec2.Sub = function(out, input, subtract) {
  out.x = input.x - subtract.x;
  out.y = input.y - subtract.y;
};

b2Vec2.prototype.Clone = function() {
  return new b2Vec2(this.x, this.y);
};

b2Vec2.prototype.Set = function(x, y) {
  this.x = x;
  this.y = y;
};

b2Vec2.prototype.Length = function() {
  var x = this.x;
  var y = this.y;
  return Math.sqrt(x * x + y * y);
};

b2Vec2.prototype.LengthSquared = function() {
  var x = this.x;
  var y = this.y;
  return x * x + y * y;
};

/** @constructor */
function b2Rot(radians) {
  if (radians === undefined) {
    radians = 0;
  }
  this.s = Math.sin(radians);
  this.c = Math.cos(radians);
}

b2Rot.prototype.Set = function(radians) {
  this.s = Math.sin(radians);
  this.c = Math.cos(radians);
};

b2Rot.prototype.SetIdentity = function() {
  this.s = 0;
  this.c = 1;
};

b2Rot.prototype.GetXAxis = function() {
  return new b2Vec2(this.c, this.s);
};

/** @constructor */
function b2Transform(position, rotation) {
  if (position === undefined) {
    position = new b2Vec2();
  }
  if (rotation === undefined) {
    rotation = new b2Rot();
  }
  this.p = position;
  this.q = rotation;
}

b2Transform.prototype.FromFloat64Array = function(arr) {
  var p = this.p;
  var q = this.q;
  p.x = arr[0];
  p.y = arr[1];
  q.s = arr[2];
  q.c = arr[3];
};

b2Transform.prototype.SetIdentity = function() {
  this.p.Set(0, 0);
  this.q.SetIdentity();
};

/** @constructor */
function b2Mat33(a, b, c, d, e, f, g, h, i) {
  //Stored in column-major order
  if (Array.isArray(a))
  {
    i = a[8];
    h = a[7];
    g = a[6];
    f = a[5];
    e = a[4];
    d = a[3];
    c = a[2];
    b = a[1];
    a = a[0];
  }
  if (a === undefined) {
    a = 0;
  }
  if (b === undefined) {
    b = 0;
  }
  if (c === undefined) {
    c = 0;
  }
  if (d === undefined) {
    d = 0;
  }
  if (e === undefined) {
    e = 0;
  }
  if (f === undefined) {
    f = 0;
  }
  if (g === undefined) {
    g = 0;
  }
  if (h === undefined) {
    h = 0;
  }
  if (i === undefined) {
    i = 0;
  }
  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.e = e;
  this.f = f;
  this.g = g;
  this.h = h;
  this.i = i;
}

// static functions on b2Mat33
b2Mat33.Identity = function() {
  return new b2Mat33(1, 0, 0, 0, 1, 0, 0, 0, 1);
};

b2Mat33.Translate = function(x, y) {
  if (x === undefined) {
    x = 0;
  }
  if (y === undefined) {
    y = 0;
  }
  return new b2Mat33(1, 0, 0, 0, 1, 0, x, y, 1);
};

b2Mat33.Rotate = function(radians) {
  if (radians === undefined) {
    radians = 0;
  }
  return new b2Mat33(Math.cos(radians), -Math.sin(radians), 0, Math.sin(radians), Math.cos(radians), 0, 0, 0, 1);
};

b2Mat33.Scale = function(x, y) {
  if (x === undefined) {
    x = 1;
  }
  if (y === undefined) {
    y = x;
  }
  return new b2Mat33(x, 0, 0, 0, y, 0, 0, 0, 1);
};

b2Mat33.Multiply = function(a, b) {
  //Check if multiplying by vector (affine transformation)
  if (b.hasOwnProperty("x"))
  {
    return new b2Vec2(a.a*b.x + a.d*b.y + a.g,
                      a.b*b.x + a.e*b.y + a.h);
  }
  else
  {
    return new b2Mat33(a.a*b.a + a.d*b.b + a.g*b.c,
                       a.b*b.a + a.e*b.b + a.h*b.c,
                       a.c*b.a + a.f*b.b + a.i*b.c,
                       a.a*b.d + a.d*b.e + a.g*b.f,
                       a.b*b.d + a.e*b.e + a.h*b.f,
                       a.c*b.d + a.f*b.e + a.i*b.f,
                       a.a*b.g + a.d*b.h + a.g*b.i,
                       a.b*b.g + a.e*b.h + a.h*b.i,
                       a.c*b.g + a.f*b.h + a.i*b.i);
  }
};

b2Mat33.Inverse = function(M) {
  var A = (M.e*M.i - M.h*M.f);
  var B = -(M.b*M.i - M.h*M.c);
  var C = (M.b*M.f - M.e*M.c);
  
  var det = M.a*A + M.d*B + M.g*C;
  if (det != 0)
  {
    det = 1.0 / det;
  }
  
  return new b2Mat33(det * A,
                     det * B,
                     det * C,
                     det * -(M.d*M.i - M.g*M.f),
                     det * (M.a*M.i - M.g*M.c),
                     det * -(M.a*M.f - M.d*M.c),
                     det * (M.d*M.h - M.g*M.e),
                     det * -(M.a*M.h - M.g*M.b),
                     det * (M.a*M.e - M.d*M.b));
};

b2Mat33.prototype.Multiply = function(other) {
  return b2Mat33.Multiply(this, other);
};

b2Mat33.prototype.Translate = function(x, y) {
  return b2Mat33.Multiply(b2Mat33.Translate(x, y), this);
};

b2Mat33.prototype.Rotate = function(radians) {
  return b2Mat33.Multiply(b2Mat33.Rotate(radians), this);
};

b2Mat33.prototype.Scale = function(x, y) {
  return b2Mat33.Multiply(b2Mat33.Scale(x, y), this);
};

b2Mat33.prototype.Inverse = function() {
  return b2Mat33.Inverse(this);
};

b2Mat33.prototype.toString = function() {
  return "\u23A1" + this.a + "," + this.d + "," + this.g + "\u23A4\n" +
         "\u23A2" + this.b + "," + this.e + "," + this.h + "\u23A5\n" +
         "\u23A3" + this.c + "," + this.f + "," + this.i + "\u23A6";
};
