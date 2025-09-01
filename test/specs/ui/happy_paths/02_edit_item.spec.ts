/**
 * @author drodriguez
 * @date 08-31-2025
*/

import { RESOURCE_ATTACHMENTS_PATH } from "../../../../src/constants/paths"
import HomePage from "../../../../src/pages/home.page"
import { addLog } from "../../../../src/utils/commands"
import randomUtils from "../../../../src/utils/randomUtils"
import basetest_create_item from "../../base_tests/basetest_create_item"

describe('Homepage', function () {
    let randomTitle: string
    let fileToUpload: string

    beforeEach(async function () {
        randomTitle = `Update article - ${randomUtils.randomString(5)} - ${randomUtils.timestamp()}`
        fileToUpload = RESOURCE_ATTACHMENTS_PATH + 'sample-png2.png'
    })

    it('Happy path - Edit a item from UI', async () => {
        const createdItemData = await basetest_create_item.createItemUsingAPI()
        const homePage = new HomePage()
        await homePage.navigate()
        await homePage.pageIsDisplayed()

        addLog('Editing item from UI setting a new title: ' + randomTitle)
        await homePage.editItem({ currentTitle: createdItemData.title, newTitle: randomTitle })
        addLog('Verifying item was updated and there is no item with the previous title')
        await homePage.verifyItemExists({ title: randomTitle, fileName: createdItemData.fileName })
        await homePage.verifyItemNotExists(createdItemData.title)

        // Verifying we are able to update both fields
        addLog('Editing item from UI setting a new title and image')
        await homePage.editItem({ currentTitle: randomTitle, newTitle: createdItemData.title, newFilePath: fileToUpload })
        // This step is failing due we are not replacing the image, is a bug in the app
        await homePage.verifyItemExists({ title: createdItemData.title, fileName: fileToUpload })
        await homePage.verifyItemNotExists(randomTitle)
    })
})