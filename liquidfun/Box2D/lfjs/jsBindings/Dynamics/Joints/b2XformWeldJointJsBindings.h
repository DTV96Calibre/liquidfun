#ifndef B2XFORMWELDJOINTJSBINDINGS_H
#define B2XFORMWELDJOINTJSBINDINGS_H

extern "C" {
void* b2XformWeldJointDef_Create(
    void* world,
    // joint def
    void* bodyA, void* bodyB, double collideConnected,
    // weld joint def
    double dampingRatio, double frequencyHz, double localAnchorAx,
    double localAnchorAy, double localAnchorBx, double localAnchorBy,
    double referenceAngle);

void* b2XformWeldJointDef_InitializeAndCreate(
    void* world,
    // initialize args
    void* bodyA, void* bodyB, double anchorX,
    double anchorY,
    // joint def
    double collideConnected,
    // weld joint def
    double dampingRatio, double frequencyHz);
}

#endif
