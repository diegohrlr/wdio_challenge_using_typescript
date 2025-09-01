/**
 * @author drodriguez
 * @date 08-31-2025
*/
import { addLog } from "../../src/utils/commands"
import HeaderComponent from "./components/header.component"

/**
* Base page class containing all shared methods for all pages
* Here we can define common functionality like navigation, shared components like header, footer, etc.
*/
export default abstract class BasePage {
    protected abstract pagePath: string
    headerComponent = HeaderComponent

    /**
     * Will navigate to the baseUrl + implemented pagePath on each class
     */
    async navigate() {
        const url = `${browser.options.baseUrl}${this.pagePath}`
        addLog(`Navigating to: ${url}`)
        await browser.url(url)
    }

}