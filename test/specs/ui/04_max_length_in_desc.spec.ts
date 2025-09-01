/**
 * @author drodriguez
 * @date 08-31-2025
*/

import { RESOURCE_ATTACHMENTS_PATH } from "../../../src/constants/paths"
import HomePage from "../../../src/pages/home.page"
import { addLog } from "../../../src/utils/commands"
import randomUtils from "../../../src/utils/randomUtils"


describe('Homepage', function () {
    let fileToUpload: string

    beforeEach(async function () {
        fileToUpload = RESOURCE_ATTACHMENTS_PATH + 'sample-png1.png'
    })

    it('Verify max length validation in description field', async () => {
        const excedeedLength = randomUtils.randomString(301)
        const limitLength = randomUtils.randomString(300)

        const homePage = new HomePage()
        await homePage.navigate()
        await homePage.pageIsDisplayed()

        addLog('Verifying invalid case (Submit CTA not clickable)')
        await homePage.verifyFormValidation({ title: excedeedLength, filePathToUpload: fileToUpload, isCTAClickable: false })

        addLog('Verifying valid case (Submit CTA clickable)')
        await homePage.verifyFormValidation({ title: limitLength, filePathToUpload: fileToUpload, isCTAClickable: true })

    })
})