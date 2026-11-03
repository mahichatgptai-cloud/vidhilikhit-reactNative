Add-Type -AssemblyName System.Drawing
$dir = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images"
Get-ChildItem "$dir\report_thumb_*.png" | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Host "$($_.Name): $($img.Width) x $($img.Height)"
    $img.Dispose()
}
