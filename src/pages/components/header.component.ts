/**
 * @author drodriguez
 * @date 08-31-2025
*/

import wdioAssertions from "../../utils/assertions/wdio_assertions";
import { addLog } from "../../utils/commands";

class HeaderComponent {
    private get headerLogo() { return $('.navbar-header > a') }
    private get navbarLinks() { return $$('ul.navbar-nav > li') }

    private get logoContent() { return { linkText: 'Angular Strangerlist', href: '/' } }
    private get navbarContent() {
        return [
            { linkText: 'Home', href: '/' },
            { linkText: 'View code on github', href: 'https://github.com/mrios/angular-strangerlist' }
        ]
    }

    async componentIsDisplayed() {
        await this.headerLogo.waitForDisplayed();
    }


    /**
     * Will verify header links content
     */
    async verifyHeaderLinks() {
        await this.componentIsDisplayed()

        addLog('verifyHeaderLinks | Verifying logo link')
        await wdioAssertions.toHaveText(this.headerLogo, this.logoContent.linkText)
        await wdioAssertions.toHaveAttributeContaining(this.headerLogo, 'href', this.logoContent.href)

        addLog('verifyHeaderLinks | Verifying navbar links')
        const links = await this.navbarLinks
        for (let index = 0; index < await links.length; index++) {
            await wdioAssertions.toHaveText(links[index], this.navbarContent[index].linkText)
            await wdioAssertions.toHaveAttributeContaining(links[index], 'href', this.navbarContent[index].href)
        }
    }

}
export default new HeaderComponent()