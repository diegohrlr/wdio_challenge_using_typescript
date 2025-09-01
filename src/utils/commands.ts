import report from '@wdio/allure-reporter'

export const addLog = (log: string) => {
    report.addStep(`STEP: ${log}`)
    console.log(`STEP: ${log}`) // To replace with Log4js or other logger
}

