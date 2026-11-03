Add-Type -AssemblyName System.Drawing
$bgPath = "c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images\04_Matchmaking_Background.png"
$bg = [System.Drawing.Image]::FromFile($bgPath)
$bmp = New-Object System.Drawing.Bitmap($bg)

Write-Host "Width: $($bmp.Width), Height: $($bmp.Height)"

# In media_1793700020532.png:
# Top header is "Matchmaking" with back arrow
# Then couple under the moon
# Then "Find Your Cosmic Connection" scroll card
# Then "Find a Match ->" teal button
# Then "How It Works"
# Step 1: Enter birth details
# Step 2: Get compatibility analysis
# Step 3: Understand insights

# Let's crop the couple artwork from 04_Matchmaking_Background.png as a dedicated standalone asset
# and check its bounds.
# Couple is in y=0..380
$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, 380)
$coupleAsset = $bmp.Clone($rect, $bmp.PixelFormat)
$coupleAsset.Save("c:\VIDHILIKHIT\vidhilikhit-reactNative\src\assets\images\matchmaking_hero_couple.png")
$coupleAsset.Dispose()
Write-Host "Saved src/assets/images/matchmaking_hero_couple.png"

$bmp.Dispose()
$bg.Dispose()
