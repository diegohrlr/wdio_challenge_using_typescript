import type { ChainablePromiseElement } from 'webdriverio'
import { addLog } from '../commands'

class Assertion {

    async toEqual(actual: string | boolean, expected: string | boolean) {
        addLog(`Assertion >> "${actual}" to equal "${expected}"`)
        expect(actual).toEqual(expected)
    }

    async toHaveText(element: ChainablePromiseElement, expectedText: string) {
        addLog(`Assertion >> "${element.selector}" to have text "${expectedText}"`)
        await expect(element).toHaveText(expectedText)
    }

    // Attributes
    async toHaveAttribute(element: ChainablePromiseElement, attribute: string, expectedValue: string) {
        addLog(`Assertion >> ${element.selector} should have attribute [${attribute}] = "${expectedValue}"`)
        await expect(element).toHaveAttr(attribute, expectedValue)
    }

    async toHaveAttributeContaining(element: ChainablePromiseElement, attribute: string, expectedPartialValue: string) {
        addLog(`Assertion >> ${element.selector} should have attribute [${attribute}] containing "${expectedPartialValue}"`)
        const value = await element.getAttribute(attribute)
        expect(value).toContain(expectedPartialValue)
    }
}

export default new Assertion()

// 