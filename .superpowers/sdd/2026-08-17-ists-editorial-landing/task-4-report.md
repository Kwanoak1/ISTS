# Task 4 Verification Report

Date: 2026-08-17
Worktree: `C:\Users\서관옥\orca\projects\ISTS\.worktrees\ists-editorial-landing`

## Status

PASS with one verification limitation: browser automation was unavailable, so 390px/1440px behavior was checked from the responsive CSS and source structure rather than in a real browser viewport.

## Checks

### Production build

Command:

```text
npm run build
```

Result: PASS, exit code 0.

- Next.js 16.3.1 production build completed.
- Compilation succeeded.
- TypeScript completed without errors.
- Static page generation completed for 4 pages.
- Routes generated: `/`, `/_not-found`, `/api/validate-gemini`.
- No TypeScript or CSS build errors were reported.

### Local HTTP

Command:

```powershell
$job = Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','start','--','-p','3100' -WorkingDirectory '.' -PassThru; Start-Sleep -Seconds 8; try { $response = Invoke-WebRequest -Uri 'http://localhost:3100/' -UseBasicParsing; "HTTP_STATUS=$($response.StatusCode)"; "CONTENT_TYPE=$($response.Headers['Content-Type'])"; "BODY_LENGTH=$($response.Content.Length)" } finally { Stop-Process -Id $job.Id -Force -ErrorAction SilentlyContinue }
```

Result: PASS.

```text
HTTP_STATUS=200
CONTENT_TYPE=text/html; charset=utf-8
BODY_LENGTH=34157
```

### Anchor and interaction source inspection

Initial combined shell probe:

```powershell
rg -n 'href="#program"|id="(top|story|purpose|program|support)"|aria-expanded|aria-controls|setMenuOpen|setSelectedYear|setSelectedDay|setOpenProgram|role="tablist"|role="tabpanel"|aria-selected|aria-pressed|focus-visible' app/page.tsx app/globals.css
```

Result: BLOCKED. `rg` was not available as a PowerShell command (`CommandNotFoundException`). The checks were then run with the repository grep tool below.

Exact source inspection commands (repository grep tool; `path` is the worktree root):

```text
grep(include="app/page.tsx", pattern="href=\"#program\"")
grep(include="app/page.tsx", pattern="id=\"(top|story|purpose|program|support)\"")
grep(include="app/page.tsx", pattern="setMenuOpen|aria-expanded|aria-controls|mobile-navigation")
grep(include="app/page.tsx", pattern="setSelectedYear|aria-pressed|activeHistory")
grep(include="app/page.tsx", pattern="setSelectedDay|role=\"tab(list|panel)\"|aria-selected|hidden=\\{selectedDay")
grep(include="app/page.tsx", pattern="setOpenProgram|aria-expanded|program-details")
grep(include="app/globals.css", pattern="focus-visible|min-height: 44px|@media \\(max-width: 760px\\)|overflow-x: hidden|overflow-wrap")
```

Concise command results:

```text
href="#program"                                  2 matches: page.tsx:103,113
id="(top|story|purpose|program|support)"         5 matches: page.tsx:108,116,118,130,132
setMenuOpen|...|mobile-navigation                 5 matches: page.tsx:75,102,103,105,130
setSelectedYear|...|activeHistory                 4 matches: page.tsx:76,79,89,116
setSelectedDay|...|tab/tabpanel/...              3 matches: page.tsx:77,89,130
setOpenProgram|...|program-details                4 matches: page.tsx:78,95,105,130
focus-visible|...|overflow-wrap                  21 matches: globals.css:20,49,79,80,83,88,89,104,107,109,113,116,122,123,126,129,138,142,145,152,153
```

All required source markers were found; the detailed findings are listed below.

Results:

- Hero CTA target: PASS. `href="#program"` found in `app/page.tsx:113`.
- Navigation anchors: PASS. `#story`, `#purpose`, `#program`, and `#support` links found at `app/page.tsx:103`; matching section IDs found at lines 116, 118, 130, and 132. `#top` is also present at the hero and closing CTA.
- Mobile menu state: PASS. `menuOpen` state, `mobile-navigation`, `aria-expanded`, `aria-controls`, toggle handler, and close handlers found at `app/page.tsx:75`, `102-105`.
- Timeline selection: PASS. `selectedYear`, `setSelectedYear`, `activeHistory`, and `aria-pressed` wiring found at `app/page.tsx:76`, `79`, and `116`.
- Day tabs: PASS. `selectedDay`, `setSelectedDay`, `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`, `aria-live`, and `hidden` wiring found at `app/page.tsx:77` and `130`.
- Program cards: PASS. `openProgram`, `setOpenProgram`, `aria-expanded`, and conditional `.program-details` rendering found at `app/page.tsx:78` and `130`.
- Keyboard/ARIA controls: PASS. Buttons use `type="button"`; menu, timeline, tab, and program controls expose the relevant ARIA attributes. Global keyboard focus styling is present at `app/globals.css:152`.

### Rendered HTML inspection

Command:

```powershell
$job = Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','start','--','-p','3101' -WorkingDirectory '.' -PassThru; Start-Sleep -Seconds 8; try { $html = (Invoke-WebRequest -Uri 'http://localhost:3101/' -UseBasicParsing).Content; $checks = [ordered]@{ 'program-anchor' = $html.Contains('href="#program"'); 'story-id' = $html.Contains('id="story"'); 'purpose-id' = $html.Contains('id="purpose"'); 'program-id' = $html.Contains('id="program"'); 'support-id' = $html.Contains('id="support"'); 'mobile-navigation' = $html.Contains('id="mobile-navigation"'); 'aria-controls' = $html.Contains('aria-controls="mobile-navigation"'); 'tablist' = $html.Contains('role="tablist"'); 'tabpanel' = $html.Contains('role="tabpanel"') }; $checks.GetEnumerator() | ForEach-Object { "$($_.Key)=$($_.Value)" } } finally { Stop-Process -Id $job.Id -Force -ErrorAction SilentlyContinue }
```

Result: PASS for all rendered markers.

```text
program-anchor=True
story-id=True
purpose-id=True
program-id=True
support-id=True
mobile-navigation=True
aria-controls=True
tablist=True
tabpanel=True
```

### Responsive checks

Browser availability command:

```powershell
$candidates = @('chrome','chrome.exe','msedge','msedge.exe','firefox','firefox.exe'); foreach ($name in $candidates) { $command = Get-Command $name -ErrorAction SilentlyContinue; if ($command) { "BROWSER=$($command.Source)" } }; if (-not (Get-Command chrome -ErrorAction SilentlyContinue) -and -not (Get-Command chrome.exe -ErrorAction SilentlyContinue) -and -not (Get-Command msedge -ErrorAction SilentlyContinue) -and -not (Get-Command msedge.exe -ErrorAction SilentlyContinue) -and -not (Get-Command firefox -ErrorAction SilentlyContinue) -and -not (Get-Command firefox.exe -ErrorAction SilentlyContinue)) { 'BROWSER_AUTOMATION=unavailable_on_PATH' }
```

Result:

```text
BROWSER_AUTOMATION=unavailable_on_PATH
```

Additional automation package check:

```text
npm ls playwright @playwright/test puppeteer --depth=0
```

Result: no Playwright, `@playwright/test`, or Puppeteer package installed.

Static responsive inspection results:

- `app/globals.css:153-175` contains the mobile breakpoint at `max-width: 760px`.
- Mobile layout collapses purpose, stats, feature, and program grids to one column.
- Mobile timeline collapses to one column.
- Day schedule collapses to two columns.
- Day tabs use horizontal scrolling instead of clipping.
- `body` and the editorial shell prevent page-level horizontal overflow; long copy uses `overflow-wrap: anywhere`.
- Infographic stats collapse to one column on mobile.
- CTA has a 48px minimum height, and interactive controls have 44px or larger minimum heights.

The requested 390px and 1440px viewport behavior was not directly browser-tested because browser automation was unavailable. No horizontal overflow, infographic clipping, or CTA clipping can be claimed from a live viewport check.

### Netlify readiness

Command/results:

```powershell
Test-Path netlify.toml
```

Result: PASS. `netlify.toml` exists and contains:

```toml
[build]
  command = "npm run build"
  publish = ".next"
```

Environment/file credential check:

```powershell
$files = @('netlify.toml','.env','.env.local','.env.production','.env.example'); foreach ($file in $files) { if (Test-Path -LiteralPath $file) { "EXISTS=$file" } else { "ABSENT=$file" } }
```

Result:

```text
EXISTS=netlify.toml
ABSENT=.env
ABSENT=.env.local
ABSENT=.env.production
ABSENT=.env.example
```

Netlify credential environment-name check, without exposing values:

```powershell
$names = @('NETLIFY_AUTH_TOKEN','NETLIFY_SITE_ID','NETLIFY_API_TOKEN'); $found = @(); foreach ($name in $names) { if (Test-Path "Env:$name") { $found += $name } }; if ($found.Count -eq 0) { 'NETLIFY_CREDENTIAL_ENV=absent' } else { 'NETLIFY_CREDENTIAL_ENV_NAMES=' + ($found -join ',') }; 'DEPLOYMENT_ATTEMPTED=no'
```

Result:

```text
NETLIFY_CREDENTIAL_ENV=absent
DEPLOYMENT_ATTEMPTED=no
```

Deployment was not attempted. No deployment URL is claimed.

### Application-file integrity

Command:

```text
git status --short
```

Result before writing this report: no output, so no application files were modified during verification. The only intended worktree change is this report file.

## Blockers

- Browser automation is unavailable in the worktree/environment. Live 390px and 1440px responsive checks could not be performed.
- Netlify deployment was not performed because no credentials were available; deployment was not required for this verification and no URL was invented.

## Final Review Fixes

Date: 2026-08-17

### Implemented

1. Removed the stale inline `<style jsx global>` block from `app/page.tsx`. `app/globals.css` is now the sole stylesheet for the landing page; the existing infographic, photo slots, responsive rules, and focus styles remain intact.
2. Updated the closing CTA to the exact text `프로그램 자세히 보기` with `href="#program"`.
3. Restored the manuscript budget as a clearly labeled collapsible `원고 예산 상세 보기` section in the source-details area. It includes income 6,000,000원, expenditure 6,000,000원, food 3,250,000원, venue 1,000,000원, activity 1,000,000원, office 100,000원, progress 100,000원, management 100,000원, snacks 200,000원, contingency 250,000원, and the note `10,000원 × 13끼 × 25명`.
4. Added Escape-to-close for the mobile menu and restores focus to the menu button after Escape.
5. Added conventional day-tab keyboard navigation for ArrowLeft, ArrowRight, Home, and End. The tabs use roving `tabIndex` while retaining `aria-controls`, `role="tabpanel"`, and panel labels.

### Final Fix Verification

Command:

```text
npm run build
```

Result: PASS, exit code 0.

```text
> ists-landing@0.1.0 build
> next build

▲ Next.js 16.3.1 (Turbopack)
✓ Running next.config.mjs took 154ms

  Creating an optimized production build ...
✓ Compiled successfully in 4.0s
  Running TypeScript ...
  Finished TypeScript in 9.0s ...
  Collecting page data using 3 workers ...
  Generating static pages using 3 workers (0/4) ...
  Generating static pages using 3 workers (1/4)
  Generating static pages using 3 workers (2/4)
  Generating static pages using 3 workers (3/4)
✓ Generating static pages using 3 workers (4/4) in 1007ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
└ ƒ /api/validate-gemini


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

Additional source checks confirmed no `style jsx` remains in `app/page.tsx`, and the required CTA, budget, Escape, arrow-navigation, and roving-tabIndex markers are present. Browser automation remains unavailable in this environment, so live viewport and keyboard interaction testing was not performed.

## Remaining Stylesheet Regression Fix

Date: 2026-08-17

Restored the missing `.source-copy` and `.source-copy ul` rules in `app/globals.css`. Contributor/details copy now uses muted 13px typography with 1.9 line-height and 20px horizontal/20px bottom spacing. Contributor lists use a two-column grid with a 25px column gap on desktop and switch to one column at the existing 760px mobile breakpoint. No inline styles were added.

### Verification

Commands:

```text
npm run build
```

Build result: PASS, exit code 0.

```text
> ists-landing@0.1.0 build
> next build

▲ Next.js 16.3.1 (Turbopack)
✓ Running next.config.mjs took 89ms

  Creating an optimized production build ...
✓ Compiled successfully in 3.7s
  Running TypeScript ...
  Finished TypeScript in 5.1s ...
  Collecting page data using 3 workers ...
  Generating static pages using 3 workers (0/4) ...
  Generating static pages using 3 workers (1/4)
  Generating static pages using 3 workers (2/4)
  Generating static pages using 3 workers (3/4)
✓ Generating static pages using 3 workers (4/4) in 901ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
└ ƒ /api/validate-gemini


○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

Source inspection found all three expected `.source-copy` selectors in `app/globals.css`; `git diff --check` passed.
