#include <Box2D/Box2D.h>
void* b2XformWeldJointDef_Create(
    void* world,
    // joint def
    void* bodyA, void* bodyB, double collideConnected,
    // weld joint def
    double dampingRatio, double frequencyHz, double localAnchorAx,
    double localAnchorAy, double localAnchorBx, double localAnchorBy,
    double referenceAngle) {
  b2XformWeldJointDef def;
  def.bodyA = (b2Body*)bodyA;
  def.bodyB = (b2Body*)bodyB;
  def.collideConnected = collideConnected;

  def.dampingRatio = dampingRatio;
  def.frequencyHz = frequencyHz;
  def.localAnchorA = b2Vec2(localAnchorAx, localAnchorAy);
  def.localAnchorB = b2Vec2(localAnchorBx, localAnchorBy);
  def.referenceAngle = referenceAngle;

  return ((b2World*)world)->CreateJoint(&def);
}
