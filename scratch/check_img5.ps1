Add-Type -AssemblyName System.Drawing
$image5Path = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images\image_5.png"
$img5 = [System.Drawing.Image]::FromFile($image5Path)
Write-Host "image_5.png Dimensions: $($img5.Width) x $($img5.Height)"

# Let's crop a small thumbnail from image_5 to see what it is
$rect = New-Object System.Drawing.Rectangle(0, 0, $img5.Width, [int]($img5.Height / 3))
$bmp = New-Object System.Drawing.Bitmap($img5)
$crop = $bmp.Clone($rect, $bmp.PixelFormat)
$crop.Save("c:\VIDHILIKHIT\vidhilikhit-reactNative\scratch\image_5_top.png")
$crop.Dispose()
$bmp.Dispose()
$img5.Dispose()

Write-Host "Saved image_5_top.png"
