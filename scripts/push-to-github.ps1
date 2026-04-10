# رفع المشروع إلى GitHub بعد تسجيل الدخول عبر: gh auth login
# الاستخدام: .\scripts\push-to-github.ps1 [-RepoName "اسم-المستودع"]

param(
    [string]$RepoName = "ruya-accounting-portal",
    [switch]$Private
)

$ErrorActionPreference = "Stop"
$gh = Join-Path ${env:ProgramFiles} "GitHub CLI\gh.exe"
if (-not (Test-Path $gh)) {
    Write-Host "GitHub CLI غير موجود. ثبّته: winget install GitHub.cli" -ForegroundColor Red
    exit 1
}

& $gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "لم يتم تسجيل الدخول إلى GitHub بعد." -ForegroundColor Yellow
    Write-Host "نفّذ أولاً (سيفتح المتصفح أو يطلب رمزاً):" -ForegroundColor Cyan
    Write-Host "  & `"$gh`" auth login" -ForegroundColor White
    Write-Host ""
    exit 1
}

$visibility = if ($Private) { "--private" } else { "--public" }
$visLabel = if ($Private) { "خاص" } else { "عام" }
Write-Host "إنشاء المستودع: $RepoName ($visLabel) ..." -ForegroundColor Cyan

# إن وُجد remote قديم origin
git remote remove origin 2>$null

& $gh repo create $RepoName $visibility --source=. --remote=origin --push --description "Accounting insights portal - Next.js"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "تم الرفع بنجاح. افتح المستودع على GitHub من لوحة المستخدم." -ForegroundColor Green
}
