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
    double referenceAngle,
    // transform
    double transformB_a, double transformB_b, double transformB_c,
    double transformB_d, double transformB_e, double transformB_f,
    double transformB_g, double transformB_h, double transformB_i,
    double transformBRot_x, double transformBRot_y);
}

#endif
