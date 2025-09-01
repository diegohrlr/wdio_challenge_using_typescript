/**
 * @author drodriguez
 * @date 08-31-2025
*/

import HomePage from "../../../src/pages/home.page"
import { addLog } from "../../../src/utils/commands"

describe('Homepage', function () {

    beforeEach(async function () {
    })

    it('Search a item created by Matt and Ross Duffer', async () => {
        const itemToSearch = 'Creators: Matt Duffer, Ross Duffer'
        const homePage = new HomePage()
        await homePage.navigate()
        await homePage.pageIsDisplayed()

        addLog('Searching for item: ' + itemToSearch)
        await homePage.verifyItemExists({ title: itemToSearch })
    })
})