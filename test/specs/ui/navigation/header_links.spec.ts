/**
 * @author drodriguez
 * @date 08-31-2025
*/

import { RESOURCE_ATTACHMENTS_PATH } from "../../../../src/constants/paths"
import HomePage from "../../../../src/pages/home.page"
import { addLog } from "../../../../src/utils/commands"
import randomUtils from "../../../../src/utils/randomUtils"


describe('Homepage', function () {

    let randomTitle: string
    let fileToUpload: string

    beforeEach(async function () {
        randomTitle = `New article - ${randomUtils.randomString(5)} - ${randomUtils.timestamp()}`
        fileToUpload = 'sample-png1.png'
    })

    it('Verify header links', async () => {
        const homePage = new HomePage()
        await homePage.navigate()
        await homePage.pageIsDisplayed()

        await homePage.headerComponent.verifyHeaderLinks()

    })
})