Add-Type -AssemblyName System.Drawing
$src = "C:\Users\Innosystech_Pc_53\.gemini\antigravity-ide\brain\8a510573-65c5-4f97-b4b2-af6849c821f0\.user_uploaded\media_1793696629576.png"
$img = [System.Drawing.Image]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap($img)

# Let's inspect column x=150 (which passes through the text and background between cards)
# Cards have background lighter than the space between them.
Write-Host "--- Scanning Y along x=150 ---"
for ($y = 110; $y -lt 480; $y++) {
    $c = $bmp.GetPixel(150, $y)
    # Check brightness or R value
    if ($y % 5 -eq 0) {
        Write-Host "$y : R=$($c.R), G=$($c.G), B=$($c.B)"
    }
}

$bmp.Dispose()
$img.Dispose()
