import shutil

# Path to the source image
src_img = 'hammar.png'

# List of names from the enum
names = [
    "BioGen", "CrysTara", "AstroMine", "CrystaBloom", "EnerGex", "StellarCharge", "FoamTap", "EnerFusion",
    "EnerPlex", "TTgenesis", "QuantaForge", "FortiFyx", "SynTitan", "SwiftForge", "XenoFloral", "TitaniumBoost",
    "CerebraSpark", "QuiFoam", "AstroCharge", "EnerGate", "CogniMelt", "NexiMine", "XenoBloom", "ResoNex",
    "Fortivest", "CogniFy", "FortiGen", "Abracadabra", "MegaBoost", "NexuMax", "SpicenRich", "EvolviFy",
    "NexroVest", "QuantumScribe", "NeuroForge", "CyberPulse", "PlasmaShift", "IlluGen", "Aespa", "SuperNova",
    "NeuroCharge", "QuantumLeap", "BioSynthesis", "PlasmaForge", "NanoWeave", "EtherPulse", "StarLight",
    "NovaBurst", "BioHarvest", "EtherForge", "TitanBloom", "QuantumFrost", "BioFusion", "NexusField",
    "StarForge", "PlasmaCharge", "BioCast", "EtherWeave", "NovaFlux", "QuantumCore", "BioSurge",
    "StarlightForge", "QuantumSurge"
]

# Copy dig.png to each new file
for name in names:
    dst_img = f"{name}.png"
    shutil.copyfile(src_img, dst_img)