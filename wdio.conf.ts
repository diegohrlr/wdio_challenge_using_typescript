import { DOWNLOAD_FOLDER_PATH } from './src/constants/paths';
import { getEnv } from './src/config/environments'
import { getDevice } from './src/config/devices'

// Loading env and device config
const envConfig = getEnv()
const deviceConfig = getDevice()

export const config: WebdriverIO.Config = {
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    services: [],
    // ==================
    // Specify Test Files
    // ==================
    specs: ['./test/specs/**/*.ts'],
    exclude: [],

    maxInstances: 2,
    capabilities: [
        {
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                prefs: {
                    "download.default_directory": DOWNLOAD_FOLDER_PATH
                },
                args: [
                    `--window-size=${deviceConfig.width},${deviceConfig.height}`,
                    '--headless=new',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-gpu'
                ],
            }
        }
    ],

    logLevel: 'error',
    baseUrl: envConfig.baseUrl,
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    // Default request retries count
    connectionRetryCount: 3,

    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        retries: 0 // To increase to set retries
    },
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
        }]
    ],
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
}