Add-Type -AssemblyName System.Drawing
$image5Path = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images\image_5.png"
$img5 = [System.Drawing.Image]::FromFile($image5Path)
Write-Host "image_5: $($img5.Width) x $($img5.Height)"

# Also let's crop the Sage circle directly from media_1793698633230.png:
$src = "C:\Users\Innosystech_Pc_53\.gemini\antigravity-ide\brain\8a510573-65c5-4f97-b4b2-af6849c821f0\.user_uploaded\media_1793698633230.png"
$botImg = [System.Drawing.Image]::FromFile($src)
$botBmp = New-Object System.Drawing.Bitmap($botImg)

# The large circular sage avatar in media_1793698633230.png:
# Let's find its exact bounds:
# x around 29 to 95, y around 125 to 191 (approx 66x66)
$sageRect = New-Object System.Drawing.Rectangle(29, 126, 67, 67)
$croppedSage = $botBmp.Clone($sageRect, $botBmp.PixelFormat)

# Upscale to 3x (201 x 201) with HighQualityBicubic for sharp retina display
$scale = 3
$w = $croppedSage.Width * $scale
$h = $croppedSage.Height * $scale
$upBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($upBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.DrawImage($croppedSage, (New-Object System.Drawing.Rectangle(0, 0, $w, $h)), 0, 0, $croppedSage.Width, $croppedSage.Height, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$dest = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images\bot_sage_avatar.png"
$upBmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
$upBmp.Dispose()
$croppedSage.Dispose()
Write-Host "Saved: $dest ($w x $h)"

$botBmp.Dispose()
$botImg.Dispose()
$img5.Dispose()
