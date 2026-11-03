Add-Type -AssemblyName System.Drawing
$src = "C:\Users\Innosystech_Pc_53\.gemini\antigravity-ide\brain\8a510573-65c5-4f97-b4b2-af6849c821f0\.user_uploaded\media_1793700020532.png"
$img = [System.Drawing.Image]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap($img)

# In 252 x 543, inner screen is roughly x=14..238, y=22..515.
# Let's crop the couple artwork from media_1793700020532.png:
# y=70 to 180, x=18 to 234: width ~216, height ~110
$rect = New-Object System.Drawing.Rectangle(18, 70, 216, 110)
$coupleCrop = $bmp.Clone($rect, $bmp.PixelFormat)
$coupleCrop.Save("c:\VIDHILIKHIT\vidhilikhit-reactNative\scratch\crop_couple.png")
$coupleCrop.Dispose()

Write-Host "Saved scratch/crop_couple.png"

$bmp.Dispose()
$img.Dispose()
