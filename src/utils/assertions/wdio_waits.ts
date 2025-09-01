import type { ChainablePromiseElement } from 'webdriverio'
import { addLog } from '../commands'

class WdioWait {

    async toHaveValue(element: ChainablePromiseElement, expectedValue: string, timeout = 5000) {
        addLog(`Wait >> ${element.selector} waiting to have value = "${expectedValue}"`)
        await browser.waitUntil(
            async () => {
                const value = await element.getValue()
                return value === expectedValue
            },
            {
                timeout,
                timeoutMsg: `Expected ${element.selector} to have value "${expectedValue}" within ${timeout}ms`
            }
        )
    }

}

export default new WdioWait()