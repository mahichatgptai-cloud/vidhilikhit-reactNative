Add-Type -AssemblyName System.Drawing
$bgPath = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images\04_Matchmaking_Background.png"
$bg = [System.Drawing.Image]::FromFile($bgPath)
$bmp = New-Object System.Drawing.Bitmap($bg)

# In 430 x 906, let's sample colors at x=215 (center):
Write-Host "--- Scanning center vertical line x=215 ---"
for ($y = 100; $y -lt 300; $y += 20) {
    $c = $bmp.GetPixel(215, $y)
    Write-Host "$y : R=$($c.R), G=$($c.G), B=$($c.B)"
}

$bmp.Dispose()
$bg.Dispose()
