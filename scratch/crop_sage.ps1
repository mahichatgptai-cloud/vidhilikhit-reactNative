Add-Type -AssemblyName System.Drawing
$src = "C:\Users\Innosystech_Pc_53\.gemini\antigravity-ide\brain\8a510573-65c5-4f97-b4b2-af6849c821f0\.user_uploaded\media_1793698633230.png"
$img = [System.Drawing.Image]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap($img)

# In test_sage (x=25..100, y=125..200):
# Find the golden/dark circular border of the avatar
# Let's scan along horizontal line y = 160 and vertical line x = 60
Write-Host "--- Scanning X at Y=165 ---"
for ($x = 25; $x -lt 100; $x++) {
    $c = $bmp.GetPixel($x, 165)
    # Write-Host "$x : R=$($c.R), G=$($c.G), B=$($c.B)"
}

# Also let's check image_5.png in src/assets/images! Does image_5.png already have the high-res Sage reading manuscript?
$image5Path = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images\image_5.png"
if (Test-Path $image5Path) {
    $img5 = [System.Drawing.Image]::FromFile($image5Path)
    Write-Host "image_5.png exists! Dimensions: $($img5.Width) x $($img5.Height)"
    $img5.Dispose()
}

$bmp.Dispose()
$img.Dispose()
