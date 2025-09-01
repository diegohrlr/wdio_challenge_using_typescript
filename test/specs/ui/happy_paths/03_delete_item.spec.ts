/**
 * @author drodriguez
 * @date 08-31-2025
*/

import HomePage from "../../../../src/pages/home.page"
import { addLog } from "../../../../src/utils/commands"
import basetest_create_item from "../../base_tests/basetest_create_item"

describe('Homepage', function () {

    beforeEach(async function () {
    })

    it('Happy path - Delete a item from UI', async () => {
        const createdItemData = await basetest_create_item.createItemUsingAPI()
        const homePage = new HomePage()
        await homePage.navigate()
        await homePage.pageIsDisplayed()

        addLog('Verifying the created item is present in the UI with title: ' + createdItemData.title)
        await homePage.verifyItemExists({ title: createdItemData.title, fileName: createdItemData.fileName })

        addLog('Deleting item: ' + createdItemData.title)
        await homePage.deleteItem(createdItemData.title, true)
        await browser.refresh()
        await homePage.verifyItemNotExists(createdItemData.title)
    })
})