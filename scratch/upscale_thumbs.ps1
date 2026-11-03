Add-Type -AssemblyName System.Drawing

$dir = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images"
$files = @(
    "report_thumb_kundali.png",
    "report_thumb_career.png",
    "report_thumb_marriage.png",
    "report_thumb_finance.png",
    "report_thumb_health.png",
    "report_thumb_dasha.png",
    "report_thumb_certificate.png"
)

foreach ($f in $files) {
    $fullPath = Join-Path $dir $f
    $img = [System.Drawing.Image]::FromFile($fullPath)
    
    $scale = 3
    $newW = $img.Width * $scale
    $newH = $img.Height * $scale
    
    $newBmp = New-Object System.Drawing.Bitmap($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($newBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $newW, $newH)
    $g.DrawImage($img, $destRect, 0, 0, $img.Width, $img.Height, [System.Drawing.GraphicsUnit]::Pixel)
    
    $g.Dispose()
    $img.Dispose()
    
    $newBmp.Save($fullPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $newBmp.Dispose()
    Write-Host "Upscaled $f to $newW x $newH"
}
