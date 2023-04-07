import numpy as np

m = 1
cm = 1e-2
mm = 1e-3
um = 1e-6
deg = 1

fLGType = 48

fCedarType = 0

kCedarH = 0
kCedarWest = 1
kCedarNorth = 2

#######################################

fManginMirrorTiltX = 0.0
fManginMirrorTiltY = 0.0
fChromaticCorrectorTiltX = 0.0
fChromaticCorrectorTiltY = 0.0
fManginMirrorReflectingSurfaceRadius = -1  # value <0 uses defaults defined in this file
fManginMirrorRefractingSurfaceRadius = -1  # value <0 uses defaults defined in this file
fManginMirrorXPosition = 0.0
fManginMirrorYPosition = 0.0
fManginMirrorCoCReflectXPosition = 0.0
fManginMirrorCoCReflectYPosition = 0.0
fManginMirrorCoCRefractXPosition = 0.0
fManginMirrorCoCRefractYPosition = 0.0
fChromaticCorrectorRearSurfaceRadius = -1  # value <0 uses defaults defined in this file
fChromaticCorrectorXPosition = 0.0
fChromaticCorrectorYPosition = 0.0
fChromaticCorrectorCoCXPosition = 0.0
fChromaticCorrectorCoCYPosition = 0.0
fAlignmentMotorX = fAlignmentMotorY = 0.0

fNSectors = 8

fCedarRegionZLength = 6.1 * m
fCedarRegionXLength = 1.2 * m
fCedarRegionYLength = 1.2 * m

# Some radial offsets (used below)
fQuartzWindowRadialOffset = 103.00 * mm
fQuartzWindowRadius = 22.50 * mm
fLightGuideCentreRadialOffset = 50.00 * mm
if(fLGType == 1 or fLGType == 3):  # pre-2012 PMT arrangements
    fLightGuideCentreRadialOffset = fQuartzWindowRadialOffset


################################/
#
# External lenses ("optical caps"): UV quality lenses from Edmund Optics
#
# Plano-convex, D=50mm.
# Stock numbers: NT67-xxx. Price: ~ GBP 140.
#
# Effective focal length (mm): 75, 100, 150, 200, 250.
# R(curvature) (mm) = 34.39, 45.85, 68.77, 91.69, 114.62.
#
# NB: fused quartz refractivity n=1.4585.
# ==> For a plano-convex lens, R = 0.4585*f.
#
# Ordered for run 2012:
# plano-convex, D=50mm, R=114.62mm, thickness centre/edge= 7.00mm/4.24mm.

fExternalLensDiameter = 50.00 * mm
fExternalLensMinThickness = 4.24 * mm
fExternalLensSurfaceRadius = 114.62 * mm

# Spherical mirrors: non-UV quality lenses from Edmund Optics,
# coated at CERN to make mirrors.
#
# Plano-convex lenses, D=50mm. Stock numbers: NT69-628 ... NA62-636.
#
# R(curvature) (mm) =
# 25.84 (?), 39.24, 51.68, 64.60, 77.52, 90.44, 103.36, 129.21, 258.40.
#
# For run 2012, the following mirror type was used:
#      R=77.52mm, D=50mm, thickness centre/edge =  9.00/4.86 mm
# For run 2014, the following mirror types will be available:
#   1) R=39.24mm, D=50mm, thickness centre/edge = 12.00/3.01 mm
#   2) R=51.68mm, D=50mm, thickness centre/edge = 10.00/3.55 mm (currently the default)
#   3) R=64.40mm, D=50mm, thickness centre/edge = 10.00/4.97 mm
#
# A spherical cap, rather than a plano-convex lens (=cylinder+cap) is simulated.

if(fCedarType == kCedarH):
    fSphericalMirrorSurfaceRadius = 77.52 * mm
else:
    fSphericalMirrorSurfaceRadius = 77.52 * mm
if(fLGType == 48):
    fSphericalMirrorSurfaceRadius = 51.68 * mm
if(fLGType == 64):
    fSphericalMirrorSurfaceRadius = 51.68 * mm

fSphericalMirrorDiameter = 50.00 * mm
fSphericalMirrorCentralAngle = 45.00 * deg

##################################/

fAtexCylinderMinRadius = 184 * mm
fAtexCylinderMaxRadius = 185 * mm
fAtexCylinderHoleDiameter = 75 * mm

fSphericalMirrorCapRadialOffset = 106.0 * mm
if(fLGType == 32):
    fSphericalMirrorCapRadialOffset = 107 * mm

# Centre of the mirror sphere (i.e. the centre of curvature)
fSphericalMirrorCentreRadialOffset = fSphericalMirrorCapRadialOffset - fSphericalMirrorSurfaceRadius / np.sqrt(2.0)

# Positions of elements with respect to the origin of the Cedar reference frame (see above)
fZRotBoxStart = 0 * mm
fZFrontPipeStart = 379 * mm
fZAtexCylinderStart = 521 * mm
fZSphericalMirrorMountStart = 524 * mm
fZLightGuideCentre = 701 * mm
fZSphericalMirrorCapCentreNominal = 701 * mm
fZExternalLensStart = 829 * mm
fZQuartzWindowStart = 851 * mm
fZMainVesselStart = 1200 * mm
fZCondenserStart = 1211 * mm
fZDiaphragmCentre = 1251 * mm
fZRotCentre = 1259 * mm
fZTestMirrorCentre = 2202 * mm
fZChromaticCorrectorStart = 2234 * mm
fZManginMirrorStart = 5732 * mm
fZExitWindowStart = 6021 * mm
fZRotBoxEnd = 6022 * mm

# Cedar-N: measurements by Serge Mathot (July 2020)
# Reference: https:#indico.cern.ch/event/934041
if(fCedarType == kCedarNorth and fCedarType == kCedarH):
    fZQuartzWindowStart = 910 * mm
    fZCondenserStart = 1250 * mm
    fZDiaphragmCentre = 1290 * mm
    fZTestMirrorCentre = 1325 * mm
    fZChromaticCorrectorStart = 2281 * mm
    fZManginMirrorStart = 5741 * mm
if(fCedarType == kCedarH):
    fZTestMirrorCentre = 1325 * mm  # depends on the final geometry... (1325, 1700, 2241)

fRotBoxXLength = 1.0 * m
fRotBoxYLength = fRotBoxXLength
fRotBoxZLength = fZRotBoxEnd - fZRotBoxStart
fRotBoxZCentre = 0.5 * (fZRotBoxEnd + fZRotBoxStart)

# Cedar misalignment: rotation
fDistanceBetweenFeet = 4347 * mm
fXRotCentre = 0 * mm
fYRotCentre = -448 * mm
fRotAngleX = +np.arctan(fAlignmentMotorX / fDistanceBetweenFeet)
fRotAngleY = -np.arctan(fAlignmentMotorY / fDistanceBetweenFeet)

fZSphericalMirrorCapCentre = [0]*fNSectors
fZSphericalMirrorCapCentreMisalignmentZ = [0]*fNSectors
fZSphericalMirrorCentre = [0]*fNSectors

# Spherical mirror misalignment
for i in range(fNSectors): 
    fZSphericalMirrorCapCentre[i] = fZSphericalMirrorCapCentreNominal
    fZSphericalMirrorCapCentre[i] += fZSphericalMirrorCapCentreMisalignmentZ[i]

# Pre-2011 PMTs: entrance to PMTs
if(fLGType == 1):
    fZLightGuideCentre = 706 * mm

# Middle of the 3-PMT holder in 2011: Z(QW) - (extension, std=331) - (half-depth)
if(fLGType == 3):
    fZLightGuideCentre = (851 - 331 - 20) * mm

for i in range(fNSectors):
    fZSphericalMirrorCentre[i] = fZSphericalMirrorCapCentre[i] - fSphericalMirrorSurfaceRadius / np.sqrt(2.0)

# Longitudunal sizes of the elements
fAtexCylinderZLength = 293.0 * mm
fSphericalMirrorMountZLength = 290.0 * mm
fSphericalMirrorMountSupportRingZLength = 10.0 * mm
fSphericalMirrorMountSupportRingRin = 68.0 * mm
fSphericalMirrorMountSupportRingRout = 245.0 * mm
fSphericalMirrorMountSupportRingHoleDia = 45.0 * mm
fEntranceWindowZLength = 150.0 * um
fExitWindowZLength = 200.0 * um

fFrontPipeZLength = fZQuartzWindowStart - fZFrontPipeStart
fQuartzWindowZLength = 10 * mm
fFrontVesselZLength = fZMainVesselStart - fZQuartzWindowStart - fQuartzWindowZLength
fMainVesselCylinderZLength = 4500 * mm
fManginMirrorZLength = 40 * mm
fManginMirrorCoatingZLength = 50 * um
fChromaticCorrectorZLength = 20 * mm
fDiaphragmZLength = 0.5 * mm
fTestMirrorZLength = 15.8 * mm
fCondenserZLength = 10.0 * mm

# Radii of the elements
fFrontPipeInnerRadius = 52.5 * mm
fFrontPipeOuterRadius = 62.5 * mm
fFrontVesselInnerRadius = 139.0 * mm
fFrontVesselOuterRadius = 150.0 * mm
fMainVesselInnerRadius = 267.0 * mm
fMainVesselOuterRadius = 279.0 * mm
fExitPipeInnerRadius = 37.5 * mm
fExitPipeOuterRadius = 39.0 * mm

if(fCedarType == kCedarH):
    fManginMirrorInnerRadius = 40.0 * mm  # Cedar-H
else:
    fManginMirrorInnerRadius = 50.0 * mm

fManginMirrorOuterRadius = 150.0 * mm
fChromaticCorrectorInnerRadius = 75.0 * mm
if(fCedarType == kCedarNorth):
    fChromaticCorrectorOuterRadius = 135.0 * mm  # Cedar-N
elif(fCedarType == kCedarWest):
    fChromaticCorrectorOuterRadius = 160.0 * mm  # Cedar-W
elif(fCedarType == kCedarH):
    fChromaticCorrectorOuterRadius = 160.0 * mm  # Cedar-H (maximum due to support structure)
fDiaphragmInnerRadius = 50.0 * mm
fDiaphragmOpeningRadius = 100.0 * mm
fDiaphragmAperturePhi = 42.6 * deg
fTestMirrorRadius = 50.82 * mm

fInterCondenserAngle = 1e-3  # a gap of about 0.1mm

fLightGuideInnerRadius = 285.0 * mm
fLightGuideOuterRadius = 302.0 * mm
fLightGuideDiameter = 250.0 * mm

# Test run 2011: Outer radius - Inner radius = Cylinder height.
# NB: cone depth = 18mm, PMT length = 11.5mm.
if(fLGType == 3):
    fLightGuideInnerRadius = 0.0 * mm
    fLightGuideOuterRadius = 40.0 * mm
    fLightGuideDiameter = 73.0 * mm


# Radii of curvature and condenser parameters
if(fCedarType == kCedarWest):
    fManginMirrorReflectingSurfaceRadius = 8610 * mm
    fManginMirrorRefractingSurfaceRadius = 6615 * mm
    fChromaticCorrectorRearSurfaceRadius = 1385 * mm
    fCondenserFrontSurfaceRadius = 300 * mm
    fCondenserRadialOffset = 130 * mm
    fCondenserOuterRadius = 60 * mm
    fCondenserDistanceToCentre = 17 * mm
elif(fCedarType == kCedarNorth):
    fManginMirrorReflectingSurfaceRadius = 8913 * mm
    fManginMirrorRefractingSurfaceRadius = 8074 * mm
    fChromaticCorrectorRearSurfaceRadius = 2885 * mm
    fCondenserFrontSurfaceRadius = 270 * mm
    fCondenserRadialOffset = 110 * mm
    fCondenserOuterRadius = 65 * mm
    fCondenserDistanceToCentre = 0 * mm
elif(fCedarType == kCedarH):
    fManginMirrorReflectingSurfaceRadius = 9770 * mm
    fManginMirrorRefractingSurfaceRadius = 8994 * mm
    fChromaticCorrectorRearSurfaceRadius = 1307 * mm
    fCondenserFrontSurfaceRadius = 300 * mm
    fCondenserRadialOffset = 130 * mm
    fCondenserOuterRadius = 60 * mm
    fCondenserDistanceToCentre = 17 * mm

############################
# Positions wrt the centre of the responsibility region

# See the documentation above regarding the position of the Cedar origin
fZCedarOrigin = -2.977 * m

# Cedar origin in RotBox frame
fZCedarOriginRB = -fRotBoxZCentre

fRotBoxPosition = np.array([0.0, 0.0, fZCedarOrigin + 0.5 * fRotBoxZLength])

###################
# Positions in the rotation box frame

fRotCentrePosition = np.array([fXRotCentre, fYRotCentre, fZCedarOriginRB + fZRotCentre])

fEntranceWindowPosition = np.array([0.0, 0.0, fZCedarOriginRB + fZFrontPipeStart - 0.5 * fEntranceWindowZLength])

fFrontPipePosition = np.array([0.0, 0.0, fZCedarOriginRB + fZFrontPipeStart + 0.5 * fFrontPipeZLength])

fQuartzWindowDiskPosition = np.array([0.0, 0.0, fZCedarOriginRB + fZQuartzWindowStart + 0.5 * fQuartzWindowZLength])

fFrontVesselPosition = np.array([0.0, 0.0,
                                    fZCedarOriginRB + fZQuartzWindowStart + fQuartzWindowZLength
                                        + 0.5 * fFrontVesselZLength])

fMainVesselCylinderPosition = np.array([0.0, 0.0, fZCedarOriginRB + fZMainVesselStart + 0.5 * fMainVesselCylinderZLength])

fExitWindowPosition = np.array([0.0, 0.0, fZCedarOriginRB + fZExitWindowStart + 0.5 * fExitWindowZLength])

fManginMirrorPosition = np.array([fManginMirrorXPosition, fManginMirrorYPosition,
                fZCedarOriginRB + fZManginMirrorStart + 0.5 * fManginMirrorZLength])

fChromaticCorrectorPosition = np.array([fChromaticCorrectorXPosition, fChromaticCorrectorYPosition,
                fZCedarOriginRB + fZChromaticCorrectorStart + 0.5 * fChromaticCorrectorZLength])

fDiaphragmPosition = np.array([0.0, 0.0, fZCedarOriginRB + fZDiaphragmCentre])

fTestMirrorPosition = np.array([0.0, 0.0, fZCedarOriginRB + fZTestMirrorCentre])

fCondenserPosition = np.array([0.0, 0.0, fZCedarOriginRB + fZCondenserStart + 0.5 * fCondenserZLength])

z = [0] * 7
rOut = [0] * 7

z[0] = fFrontVesselPosition[2] - 0.5 * fFrontVesselZLength
z[1] = z[0] + fFrontVesselZLength
z[2] = z[1]
z[3] = z[2] + 1.0 * cm
z[4] = z[3]
z[5] = fMainVesselCylinderPosition[2] + 0.5 * fMainVesselCylinderZLength
z[6] = fExitWindowPosition[2] - 0.5 * fExitWindowZLength


rOut[0] = fFrontVesselOuterRadius
rOut[1] = rOut[0]
rOut[2] = fMainVesselOuterRadius
rOut[3] = rOut[2]
rOut[4] = rOut[3]
rOut[5] = rOut[4]
rOut[6] = fExitPipeOuterRadius


print(z)
print(rOut)