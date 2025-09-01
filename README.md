# Automation Challenge using WDIO and Typescript

### Requirements:
[Chrome] Installed

[NodeJs] >=20

[Java] In case if we want to get Allure report

### Test Config
```bash
Allowed envs: dev | stg | prd
Allowed devices: desktop | mobile
```

### Getting Started

Install the dependencies:

```bash
1. npm i
2. npm run regressionDesktop // For Desktop regression
2. npm run regressionMobile // For Desktop regression
3. npm run generateAllureReport // To generate Allure report (Java required)
```

Run single test:

```bash

LINUX/MAC: ENV=prd DEVICE=desktop npx wdio run ./wdio.conf.ts --spec test/specs/happy_paths/05_search_item.spec.ts
WINDOWS CMD: set ENV=prd&& set DEVICE=mobile&& npx wdio run ./wdio.conf.ts --spec test/specs/ui/happy_paths/03_delete_item.spec.ts
WINDOWS POWERSHELL: $env:ENV="prd"; $env:DEVICE="desktop"; npx wdio run ./wdio.conf.ts --spec test/specs/ui/happy_paths/03_delete_item.spec.ts
```

### Key Features

    - WDIO V9 with Page Object Design pattern
    - SuperTest for API tests
    - Multi envrionment support
    - Allure Report
    - Assertion, Waits, API Assertions and random utilites

### Found bugs:
ISSUE 1: test/specs/api/create_item_security.spec.ts --> POST endpoint (create item) is exposed. We should not expose this endpoint and if we don't send a Bearer we should retrieve a 401 unauthorized.
Adding a token the spec should pass. NOTICE: Edit and Delete are using this exposed endpoint so we should update the request setting the Bearer once fixed.

ISSUE 2: test/specs/ui/navigation/header_links.spec.ts --> Logo and Homepage tab are not using href='/' so the redirection is not working. If we already have data in the details form (as item edit) this will not be cleared

ISSUE 3: test/specs/ui/happy_paths/02_edit_item.spec.ts --> Edit is not uploading and replacing a new picture. Once fixed should pass.

