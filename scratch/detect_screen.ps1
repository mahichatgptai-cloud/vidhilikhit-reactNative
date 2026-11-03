Add-Type -AssemblyName System.Drawing
$src = "C:\Users\Innosystech_Pc_53\.gemini\antigravity-ide\brain\8a510573-65c5-4f97-b4b2-af6849c821f0\.user_uploaded\media_1793696629576.png"
$img = [System.Drawing.Image]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap($img)

Write-Host "--- Scanning Y at X=50 ---"
for ($y = 0; $y -lt 40; $y++) {
    $c = $bmp.GetPixel(50, $y)
    Write-Host "$y : R=$($c.R), G=$($c.G), B=$($c.B)"
}

Write-Host "--- Scanning Y from bottom at X=50 ---"
for ($y = $bmp.Height - 1; $y -gt $bmp.Height - 40; $y--) {
    $c = $bmp.GetPixel(50, $y)
    Write-Host "$y : R=$($c.R), G=$($c.G), B=$($c.B)"
}

$bmp.Dispose()
$img.Dispose()
