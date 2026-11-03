Add-Type -AssemblyName System.Drawing
$bgPath = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images\04_Matchmaking_Background.png"
$bg = [System.Drawing.Image]::FromFile($bgPath)
$bmp = New-Object System.Drawing.Bitmap($bg)

# Save a crop of the top region of 04_Matchmaking_Background.png
$rect = New-Object System.Drawing.Rectangle(0, 50, $bg.Width, 300)
$crop = $bmp.Clone($rect, $bmp.PixelFormat)
$crop.Save("c:\VIDHILIKHIT\vidhilikhit-reactNative\scratch\bg_top_crop.png")
$crop.Dispose()

Write-Host "Saved scratch/bg_top_crop.png"

$bmp.Dispose()
$bg.Dispose()
