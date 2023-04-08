
const m = 1e2;
const cm = 1;
const mm = 1e-1;
const um = 1e-4;
const deg = 1;

const fLGType = 48;

const fCedarType = 0;

const kCedarH = 0;
const kCedarWest = 1;
const kCedarNorth = 2;

//////////////////////////////////////////////////////////////////////////////

export var fManginMirrorTiltX = 0.0;
export var fManginMirrorTiltY = 0.0;
export var fChromaticCorrectorTiltX = 0.0;
export var fChromaticCorrectorTiltY = 0.0;
export var fManginMirrorReflectingSurfaceRadius = -1;  // value <0 uses defaults defined in this file
export var fManginMirrorRefractingSurfaceRadius = -1;  // value <0 uses defaults defined in this file
export var fManginMirrorXPosition = 0.0;
export var fManginMirrorYPosition = 0.0;
export var fManginMirrorCoCReflectXPosition = 0.0;
export var fManginMirrorCoCReflectYPosition = 0.0;
export var fManginMirrorCoCRefractXPosition = 0.0;
export var fManginMirrorCoCRefractYPosition = 0.0;
export var fChromaticCorrectorRearSurfaceRadius = -1;  // value <0 uses defaults defined in this file
export var fChromaticCorrectorXPosition = 0.0;
export var fChromaticCorrectorYPosition = 0.0;
export var fChromaticCorrectorCoCXPosition = 0.0;
export var fChromaticCorrectorCoCYPosition = 0.0;
export var fAlignmentMotorX = 0;
export var fAlignmentMotorY = 0.0;

const fNSectors = 8;

// Some radial offsets (used below)
export var fQuartzWindowRadialOffset = 103.00 * mm;
export var fQuartzWindowRadius = 22.50 * mm;
export var fLightGuideCentreRadialOffset = 50.00 * mm;
if(fLGType == 1 || fLGType == 3)  // pre-2012 PMT arrangements
    fLightGuideCentreRadialOffset = fQuartzWindowRadialOffset;


/////////////////////////////////////////////////////////////////
//
// External lenses ("optical caps"): UV quality lenses from Edmund Optics
//
// Plano-convex, D=50mm.
// Stock numbers: NT67-xxx. Price: ~ GBP 140.
//
// Effective focal length (mm): 75, 100, 150, 200, 250.
// R(curvature) (mm) = 34.39, 45.85, 68.77, 91.69, 114.62.
//
// NB: fused quartz refractivity n=1.4585.
// ==> For a plano-convex lens, R = 0.4585*f.
//
// Ordered for run 2012:
// plano-convex, D=50mm, R=114.62mm, thickness centre/edge= 7.00mm/4.24mm.

export var fExternalLensDiameter = 50.00 * mm;
export var fExternalLensMinThickness = 4.24 * mm;
export var fExternalLensSurfaceRadius = 114.62 * mm;

// Spherical mirrors: non-UV quality lenses from Edmund Optics,
// coated at CERN to make mirrors.
//
// Plano-convex lenses, D=50mm. Stock numbers: NT69-628 ... NA62-636.
//
// R(curvature) (mm) =
// 25.84 (?), 39.24, 51.68, 64.60, 77.52, 90.44, 103.36, 129.21, 258.40.
//
// For run 2012, the following mirror type was used:
//      R=77.52mm, D=50mm, thickness centre/edge =  9.00/4.86 mm
// For run 2014, the following mirror types will be available:
//   1) R=39.24mm, D=50mm, thickness centre/edge = 12.00/3.01 mm
//   2) R=51.68mm, D=50mm, thickness centre/edge = 10.00/3.55 mm (currently the default)
//   3) R=64.40mm, D=50mm, thickness centre/edge = 10.00/4.97 mm
//
// A spherical cap, rather than a plano-convex lens (=cylinder+cap) is simulated.

export var fSphericalMirrorSurfaceRadius = 0;

if(fCedarType == kCedarH)
    fSphericalMirrorSurfaceRadius = 77.52 * mm;
else
    fSphericalMirrorSurfaceRadius = 77.52 * mm;
if(fLGType == 48)
    fSphericalMirrorSurfaceRadius = 51.68 * mm;
if(fLGType == 64)
    fSphericalMirrorSurfaceRadius = 51.68 * mm;

export var fSphericalMirrorDiameter = 50.00 * mm;
export var fSphericalMirrorCentralAngle = 45.00 * deg;

/////////////////////////////////////////////////////////////////////

export var fAtexCylinderMinRadius = 184 * mm;
export var fAtexCylinderMaxRadius = 185 * mm;
export var fAtexCylinderHoleDiameter = 75 * mm;

export var fSphericalMirrorCapRadialOffset = 106.0 * mm;
if(fLGType == 32)
    fSphericalMirrorCapRadialOffset = 107 * mm;

// Centre of the mirror sphere (i.e. the centre of curvature)
export var fSphericalMirrorCentreRadialOffset = fSphericalMirrorCapRadialOffset - fSphericalMirrorSurfaceRadius / Math.sqrt(2.0);

// Positions of elements with respect to the origin of the Cedar reference frame (see above)
export var fZRotBoxStart = 0 * mm;
export var fZFrontPipeStart = 379 * mm;
export var fZAtexCylinderStart = 521 * mm;
export var fZSphericalMirrorMountStart = 524 * mm;
export var fZLightGuideCentre = 701 * mm;
export var fZSphericalMirrorCapCentreNominal = 701 * mm;
export var fZExternalLensStart = 829 * mm;
export var fZQuartzWindowStart = 851 * mm;
export var fZMainVesselStart = 1200 * mm;
export var fZCondenserStart = 1211 * mm;
export var fZDiaphragmCentre = 1251 * mm;
export var fZRotCentre = 1259 * mm;
export var fZTestMirrorCentre = 2202 * mm;
export var fZChromaticCorrectorStart = 2234 * mm;
export var fZManginMirrorStart = 5732 * mm;
export var fZExitWindowStart = 6021 * mm;
export var fZRotBoxEnd = 6022 * mm;

// Cedar-N: measurements by Serge Mathot (July 2020)
// Reference: https://indico.cern.ch/event/934041
if(fCedarType == kCedarNorth && fCedarType == kCedarH) {
    fZQuartzWindowStart = 910 * mm;
    fZCondenserStart = 1250 * mm;
    fZDiaphragmCentre = 1290 * mm;
    fZTestMirrorCentre = 1325 * mm;
    fZChromaticCorrectorStart = 2281 * mm;
    fZManginMirrorStart = 5741 * mm;
}
if(fCedarType == kCedarH)
    fZTestMirrorCentre = 1325 * mm;  // depends on the final geometry... (1325, 1700, 2241)

export var fRotBoxXLength = 1.0 * m;
export var fRotBoxYLength = fRotBoxXLength;
export var fRotBoxZLength = fZRotBoxEnd - fZRotBoxStart;
export var fRotBoxZCentre = 0.5 * (fZRotBoxEnd + fZRotBoxStart);

// Cedar misalignment: rotation
export var fDistanceBetweenFeet = 4347 * mm;
export var fXRotCentre = 0 * mm;
export var fYRotCentre = -448 * mm;
export var fRotAngleX = +Math.atan(fAlignmentMotorX / fDistanceBetweenFeet);
export var fRotAngleY = -Math.atan(fAlignmentMotorY / fDistanceBetweenFeet);

export var fZSphericalMirrorCapCentre = [];
export var fZSphericalMirrorCapCentreMisalignmentZ = [];
export var fZSphericalMirrorCentre = [];

// Spherical mirror misalignment
for(let i; i<fNSectors; i++) {
    fZSphericalMirrorCapCentre[i] = fZSphericalMirrorCapCentreNominal;
    fZSphericalMirrorCapCentre[i] += fZSphericalMirrorCapCentreMisalignmentZ[i];
}
// Pre-2011 PMTs: entrance to PMTs
if(fLGType == 1)
    fZLightGuideCentre = 706 * mm;

// Middle of the 3-PMT holder in 2011: Z(QW) - (extension, std=331) - (half-depth)
if(fLGType == 3)
    fZLightGuideCentre = (851 - 331 - 20) * mm;

for(let i; i<fNSectors; i++)
    fZSphericalMirrorCentre[i] = fZSphericalMirrorCapCentre[i] - fSphericalMirrorSurfaceRadius / Math.sqrt(2.0);

// Longitudunal sizes of the elements
export var fAtexCylinderZLength = 293.0 * mm;
export var fSphericalMirrorMountZLength = 290.0 * mm;
export var fSphericalMirrorMountSupportRingZLength = 10.0 * mm;
export var fSphericalMirrorMountSupportRingRin = 68.0 * mm;
export var fSphericalMirrorMountSupportRingRout = 245.0 * mm;
export var fSphericalMirrorMountSupportRingHoleDia = 45.0 * mm;
export var fEntranceWindowZLength = 150.0 * um;
export var fExitWindowZLength = 200.0 * um;

export var fFrontPipeZLength = fZQuartzWindowStart - fZFrontPipeStart;
export var fQuartzWindowZLength = 10 * mm;
export var fFrontVesselZLength = fZMainVesselStart - fZQuartzWindowStart - fQuartzWindowZLength;
export var fMainVesselCylinderZLength = 4500 * mm;
export var fManginMirrorZLength = 40 * mm;
export var fManginMirrorCoatingZLength = 50 * um;
export var fChromaticCorrectorZLength = 20 * mm;
export var fDiaphragmZLength = 0.5 * mm;
export var fTestMirrorZLength = 15.8 * mm;
export var fCondenserZLength = 10.0 * mm;

// Radii of the elements
export var fFrontPipeInnerRadius = 52.5 * mm;
export var fFrontPipeOuterRadius = 62.5 * mm;
export var fFrontVesselInnerRadius = 139.0 * mm;
export var fFrontVesselOuterRadius = 150.0 * mm;
export var fMainVesselInnerRadius = 267.0 * mm;
export var fMainVesselOuterRadius = 279.0 * mm;
export var fExitPipeInnerRadius = 37.5 * mm;
export var fExitPipeOuterRadius = 39.0 * mm;

export var fManginMirrorInnerRadius = 0;

if(fCedarType == kCedarH)
    fManginMirrorInnerRadius = 40.0 * mm;  // Cedar-H
else
    fManginMirrorInnerRadius = 50.0 * mm;

export var fManginMirrorOuterRadius = 150.0 * mm;
export var fChromaticCorrectorInnerRadius = 75.0 * mm;
export var fChromaticCorrectorOuterRadius = 0 * mm;

if(fCedarType == kCedarNorth)
    fChromaticCorrectorOuterRadius = 135.0 * mm;  // Cedar-N
else if(fCedarType == kCedarWest)
    fChromaticCorrectorOuterRadius = 160.0 * mm;  // Cedar-W
else if(fCedarType == kCedarH)
    fChromaticCorrectorOuterRadius = 160.0 * mm;  // Cedar-H (maximum due to support structure)
export var fDiaphragmInnerRadius = 50.0 * mm;
export var fDiaphragmOpeningRadius = 100.0 * mm;
export var fDiaphragmAperturePhi = 42.6 * deg;
export var fTestMirrorRadius = 50.82 * mm;

export var fInterCondenserAngle = 1e-3;  // a gap of about 0.1mm

export var fLightGuideInnerRadius = 285.0 * mm;
export var fLightGuideOuterRadius = 302.0 * mm;
export var fLightGuideDiameter = 250.0 * mm;

// Test run 2011: Outer radius - Inner radius = Cylinder height.
// NB: cone depth = 18mm, PMT length = 11.5mm.
if(fLGType == 3){
    fLightGuideInnerRadius = 0.0 * mm;
    fLightGuideOuterRadius = 40.0 * mm;
    fLightGuideDiameter = 73.0 * mm;
}

export var fCondenserFrontSurfaceRadius = 0;
export var fCondenserRadialOffset = 0;
export var fCondenserOuterRadius = 0;
export var fCondenserDistanceToCentre = 0;
// Radii of curvature and condenser parameters
if(fCedarType == kCedarWest){
    fManginMirrorReflectingSurfaceRadius = 8610 * mm;
    fManginMirrorRefractingSurfaceRadius = 6615 * mm;
    fChromaticCorrectorRearSurfaceRadius = 1385 * mm;
    fCondenserFrontSurfaceRadius = 300 * mm;
    fCondenserRadialOffset = 130 * mm;
    fCondenserOuterRadius = 60 * mm;
    fCondenserDistanceToCentre = 17 * mm;
}
else if(fCedarType == kCedarNorth){
    fManginMirrorReflectingSurfaceRadius = 8913 * mm;
    fManginMirrorRefractingSurfaceRadius = 8074 * mm;
    fChromaticCorrectorRearSurfaceRadius = 2885 * mm;
    fCondenserFrontSurfaceRadius = 270 * mm;
    fCondenserRadialOffset = 110 * mm;
    fCondenserOuterRadius = 65 * mm;
    fCondenserDistanceToCentre = 0 * mm;
}
else if(fCedarType == kCedarH){
    fManginMirrorReflectingSurfaceRadius = 9770 * mm;
    fManginMirrorRefractingSurfaceRadius = 8994 * mm;
    fChromaticCorrectorRearSurfaceRadius = 1307 * mm;
    fCondenserFrontSurfaceRadius = 300 * mm;
    fCondenserRadialOffset = 130 * mm;
    fCondenserOuterRadius = 60 * mm;
    fCondenserDistanceToCentre = 17 * mm;
}
////////////////////////////////////////////////////////
// Positions wrt the centre of the responsibility region

// See the documentation above regarding the position of the Cedar origin
export var fZCedarOrigin = -2.977 * m;

// Cedar origin in RotBox frame
export var fZCedarOriginRB = -fRotBoxZCentre;

export var fRotBoxPosition = [0.0, 0.0, fZCedarOrigin + 0.5 * fRotBoxZLength];

//////////////////////////////////////
// Positions in the rotation box frame

export var fRotCentrePosition = [fXRotCentre, fYRotCentre, fZCedarOriginRB + fZRotCentre];

export var fEntranceWindowPosition = [0.0, 0.0, fZCedarOriginRB + fZFrontPipeStart - 0.5 * fEntranceWindowZLength];

export var fFrontPipePosition = [0.0, 0.0, fZCedarOriginRB + fZFrontPipeStart + 0.5 * fFrontPipeZLength];

export var fQuartzWindowDiskPosition = [0.0, 0.0, fZCedarOriginRB + fZQuartzWindowStart + 0.5 * fQuartzWindowZLength];

export var fFrontVesselPosition = [0.0, 0.0,
                                    fZCedarOriginRB + fZQuartzWindowStart + fQuartzWindowZLength
                                        + 0.5 * fFrontVesselZLength];

export var fMainVesselCylinderPosition = [0.0, 0.0, fZCedarOriginRB + fZMainVesselStart + 0.5 * fMainVesselCylinderZLength];

export var fExitWindowPosition = [0.0, 0.0, fZCedarOriginRB + fZExitWindowStart + 0.5 * fExitWindowZLength];

export var fManginMirrorPosition = [fManginMirrorXPosition, fManginMirrorYPosition,
                fZCedarOriginRB + fZManginMirrorStart + 0.5 * fManginMirrorZLength];

export var fChromaticCorrectorPosition = [fChromaticCorrectorXPosition, fChromaticCorrectorYPosition,
                fZCedarOriginRB + fZChromaticCorrectorStart + 0.5 * fChromaticCorrectorZLength];

export var fDiaphragmPosition = [0.0, 0.0, fZCedarOriginRB + fZDiaphragmCentre];

export var fTestMirrorPosition = [0.0, 0.0, fZCedarOriginRB + fZTestMirrorCentre];

export var fCondenserPosition = [0.0, 0.0, fZCedarOriginRB + fZCondenserStart + 0.5 * fCondenserZLength];
