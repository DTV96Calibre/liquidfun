#ifndef B2FIXTUREJSBINDINGS_H
#define B2FIXTUREJSBINDINGS_H

extern "C" {
double b2Fixture_TestPoint(void* fixture, double x, double y);
void b2Fixture_Refilter(void* fixture);
}
#endif
