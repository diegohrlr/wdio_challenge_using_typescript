/**
 * @author drodriguez
 * @date 08-31-2025
*/


import HomePage from "../../../src/pages/home.page"
import { addLog } from "../../../src/utils/commands"

describe('Homepage', function () {

    beforeEach(async function () {
    })

    it('Verify list of items and structure', async () => {
        const homePage = new HomePage()
        await homePage.navigate()
        await homePage.pageIsDisplayed()

        addLog('Verifying the list of items is displayed and contains the expected data retrieved from the API')
        await homePage.verifyListOfItems()
    })
})