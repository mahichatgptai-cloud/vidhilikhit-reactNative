Add-Type -AssemblyName System.Drawing
$src = "C:\Users\Innosystech_Pc_53\.gemini\antigravity-ide\brain\8a510573-65c5-4f97-b4b2-af6849c821f0\.user_uploaded\media_1793696629576.png"
$img = [System.Drawing.Image]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap($img)

$outDir = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images"

# High-quality crop function with bicubic interpolation if resizing
function Crop-Image($x, $y, $w, $h, $destPath) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Host "Saved: $destPath"
}

# The thumbnails on the left of each card:
# Card 1: Full Kundali Report (Ancient Vedic Manuscript)
Crop-Image 25 119 62 36 "$outDir\report_thumb_kundali.png"

# Card 2: Career Report (Bar chart with golden arrow)
Crop-Image 25 164 62 36 "$outDir\report_thumb_career.png"

# Card 3: Marriage & Relationship Report (Golden wedding rings)
Crop-Image 25 209 62 36 "$outDir\report_thumb_marriage.png"

# Card 4: Finance Report (Golden Kalash pot overflowing with coins)
Crop-Image 25 254 62 36 "$outDir\report_thumb_finance.png"

# Card 5: Health Report (Ayurvedic botanical leaf sprout)
Crop-Image 25 299 62 36 "$outDir\report_thumb_health.png"

# Card 6: Dasha Report (Saturn celestial rings in cosmos)
Crop-Image 25 344 62 36 "$outDir\report_thumb_dasha.png"

# Bottom Banner: Get Your Personalized Report certificate icon
Crop-Image 34 429 32 36 "$outDir\report_thumb_certificate.png"

$bmp.Dispose()
$img.Dispose()
