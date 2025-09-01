/**
 * @author drodriguez
 * @date 08-31-2025
*/

import { RESOURCE_ATTACHMENTS_PATH } from "../../../src/constants/paths"
import itemsAPI from "../../../src/utils/apis/items"
import { addLog } from "../../../src/utils/commands"
import randomUtils from "../../../src/utils/randomUtils"
import basetest_create_item from "../base_tests/basetest_create_item"

describe('Items API', function () {
    let randomTitle: string
    let fileToUpload: string

    beforeEach(async function () {
        randomTitle = `New article - ${randomUtils.randomString(5)} - ${randomUtils.timestamp()}`
        fileToUpload = RESOURCE_ATTACHMENTS_PATH + 'sample-png1.png'
    })

    it('Verify we cannot create a new item without oauth token', async () => {
        const resp = await itemsAPI.addItem({ title: randomTitle, filePath: fileToUpload, expectedResponseCode: 401 })
        addLog('Response when trying to create item without token: ' + JSON.stringify(resp))
        expect(resp.error).toBe('Unauthorized')
    })
})