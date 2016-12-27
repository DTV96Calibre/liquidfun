#include <Box2D/Box2D.h>
void* b2XformWeldJointDef_Create(
    void* world,
    // joint def
    void* bodyA, void* bodyB, double collideConnected,
    // weld joint def
    double dampingRatio, double frequencyHz, double localAnchorAx,
    double localAnchorAy, double localAnchorBx, double localAnchorBy,
    double referenceAngle,
    // transform
    double transformB_a, double transformB_b, double transformB_c,
    double transformB_d, double transformB_e, double transformB_f,
    double transformB_g, double transformB_h, double transformB_i,
    double transformBRot_x, double transformBRot_y) {
  b2XformWeldJointDef def;
  def.bodyA = (b2Body*)bodyA;
  def.bodyB = (b2Body*)bodyB;
  def.collideConnected = collideConnected;

  def.dampingRatio = dampingRatio;
  def.frequencyHz = frequencyHz;
  def.localAnchorA = b2Vec2(localAnchorAx, localAnchorAy);
  def.localAnchorB = b2Vec2(localAnchorBx, localAnchorBy);
  def.referenceAngle = referenceAngle;
  
  def.transformB.ex = b2Vec3(transformB_a, transformB_b, transformB_c);
  def.transformB.ey = b2Vec3(transformB_d, transformB_e, transformB_f);
  def.transformB.ez = b2Vec3(transformB_g, transformB_h, transformB_i);
  
  def.transformBRot = b2Vec2(transformBRot_x, transformBRot_y);

  return ((b2World*)world)->CreateJoint(&def);
}
