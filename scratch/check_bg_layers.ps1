Add-Type -AssemblyName System.Drawing
$bgPath = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images\04_Matchmaking_Background.png"
$bg = [System.Drawing.Image]::FromFile($bgPath)
$bmp = New-Object System.Drawing.Bitmap($bg)

# Check colors in the middle of 04_Matchmaking_Background.png at y=400 (where the parchment banner would be)
Write-Host "--- Scanning y=400 across x ---"
for ($x = 50; $x -lt 400; $x += 30) {
    $c = $bmp.GetPixel($x, 400)
    Write-Host "$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}

# Also at y=600 (where How It Works is)
Write-Host "--- Scanning y=600 across x ---"
for ($x = 50; $x -lt 400; $x += 30) {
    $c = $bmp.GetPixel($x, 600)
    Write-Host "$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}

$bmp.Dispose()
$bg.Dispose()
