var b2XformWeldJointDef_Create = Module.cwrap("b2XformWeldJointDef_Create",
  'number',
  ['number',
    // joint Def
    'number', 'number', 'number',
    // weld joint def
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
    this.referenceAngle);
  return weldJoint;
};

b2XformWeldJointDef.prototype.InitializeAndCreate  = function(bodyA, bodyB, anchor) {
  this.bodyA = bodyA;
  this.bodyB = bodyB;
  var weldJoint = new b2XformWeldJoint(this);
  weldJoint.ptr = b2XformWeldJointDef_InitializeAndCreate(
    world.ptr,
    // InitializeArgs
    this.bodyA.ptr, this.bodyB.ptr, anchor.x,
    anchor.y,
    // joint def
    this.collideConnected,
    //Weld joint def
    this.dampingRatio, this.frequencyHz);
  b2World._Push(weldJoint, world.joints);
  return weldJoint;
};

/** @constructor */
function b2XformWeldJoint(def) {
  this.bodyA = def.bodyA;
  this.bodyB = def.bodyB;
  this.next = null;
  this.ptr = null;
}