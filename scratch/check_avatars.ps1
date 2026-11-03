Add-Type -AssemblyName System.Drawing
$dir = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images"
$avatars = @("aarav_avatar.jpg", "riya_avatar.jpg", "father_avatar.jpg", "mother_avatar.jpg")

foreach ($a in $avatars) {
    $p = Join-Path $dir $a
    if (Test-Path $p) {
        $img = [System.Drawing.Image]::FromFile($p)
        Write-Host "$a exists: $($img.Width) x $($img.Height)"
        $img.Dispose()
    } else {
        Write-Host "$a not found"
    }
}
