var b2XformWeldJointDef_Create = Module.cwrap("b2XformWeldJointDef_Create",
  'number',
  ['number',
    // joint Def
    'number', 'number', 'number',
    // weld joint def
    'number', 'number', 'number',
    'number', 'number', 'number',
    //transform
    'number', 'number', 'number',
    'number', 'number', 'number',
    'number', 'number', 'number']);
    
/** @constructor */
function b2XformWeldJointDef() {
  // joint def
  this.bodyA = null;
  this.bodyB = null;
  this.collideConnected = false;

  // Weld joint def
  this.dampingRatio = 0;
  this.frequencyHz = 0;
  this.localAnchorA = new b2Vec2();
  this.localAnchorB = new b2Vec2();
  this.referenceAngle = 0;
  
  // Transform
  this.transformB = b2Mat33.Identity();
}

b2XformWeldJointDef.prototype.Create = function(world) {
  var weldJoint = new b2XformWeldJoint(this);
  weldJoint.ptr = b2XformWeldJointDef_Create(
    world.ptr,
    // joint def
    this.bodyA.ptr, this.bodyB.ptr, this.collideConnected,
    //Weld joint def
    this.dampingRatio, this.frequencyHz, this.localAnchorA.x,
    this.localAnchorA.y, this.localAnchorB.x, this.localAnchorB.y,
    this.referenceAngle,
    // transform
    this.transformB.a, this.transformB.b, this.transformB.c,
    this.transformB.d, this.transformB.e, this.transformB.f,
    this.transformB.g, this.transformB.h, this.transformB.i);
  weldJoint.buffer = new DataView(Module.HEAPU8.buffer, weldJoint.ptr);
  return weldJoint;
};

// memory offsets
var b2XformWeldJoint_transformB_offset = Offsets.b2XformWeldJoint.transformB;
/** @constructor */
function b2XformWeldJoint(def) {
  this.bodyA = def.bodyA;
  this.bodyB = def.bodyB;
  this.next = null;
  this.ptr = null;
  this.buffer = null;
}

b2XformWeldJoint.prototype.GetTransformB = function() {
  var transform = new b2Mat33();
  transform.a = this.buffer.getFloat32(b2XformWeldJoint_transformB_offset, true);
  transform.b = this.buffer.getFloat32(b2XformWeldJoint_transformB_offset+4, true);
  transform.c = this.buffer.getFloat32(b2XformWeldJoint_transformB_offset+8, true);
  transform.d = this.buffer.getFloat32(b2XformWeldJoint_transformB_offset+12, true);
  transform.e = this.buffer.getFloat32(b2XformWeldJoint_transformB_offset+16, true);
  transform.f = this.buffer.getFloat32(b2XformWeldJoint_transformB_offset+20, true);
  transform.g = this.buffer.getFloat32(b2XformWeldJoint_transformB_offset+24, true);
  transform.h = this.buffer.getFloat32(b2XformWeldJoint_transformB_offset+28, true);
  transform.i = this.buffer.getFloat32(b2XformWeldJoint_transformB_offset+32, true);
  return transform;
};
