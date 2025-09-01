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
