$files = Get-ChildItem -Recurse -Include "*.tsx","*.ts" -Path "D:\laragon\www\Tembi-Web"
foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName)
  $newContent = $content -replace '@/app/context/LanguageContext', '@/app/(public)/context/LanguageContext'
  $newContent = $newContent -replace '@/app/globals\.css', '@/app/(public)/globals.css'
  if ($newContent -ne $content) {
    [System.IO.File]::WriteAllText($file.FullName, $newContent)
    Write-Host ("Updated: " + $file.FullName)
  }
}
