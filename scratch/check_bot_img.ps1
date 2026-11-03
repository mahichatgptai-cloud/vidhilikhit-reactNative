Add-Type -AssemblyName System.Drawing
$filePath = "C:\Users\Innosystech_Pc_53\.gemini\antigravity-ide\brain\8a510573-65c5-4f97-b4b2-af6849c821f0\.user_uploaded\media_1793698633230.png"
$img = [System.Drawing.Image]::FromFile($filePath)
Write-Host "Dimensions: $($img.Width) x $($img.Height)"
$img.Dispose()
