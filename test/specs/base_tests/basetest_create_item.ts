/**
 * @author drodriguez
 * @date 08-31-2025
*/

import { RESOURCE_ATTACHMENTS_PATH } from "../../../src/constants/paths"
import items from "../../../src/utils/apis/items"
import randomUtils from "../../../src/utils/randomUtils"
import { addLog } from "../../../src/utils/commands"


export default new class BaseTestCreateItem {

    async createItemUsingAPI() {
        const randomTitle = `New article - ${randomUtils.randomString(5)} - ${randomUtils.timestamp()}`
        const filenameToUpload = 'sample-png1.png'

        addLog('Creating new item using API with title: ' + randomTitle)
        const filePathToUpload = RESOURCE_ATTACHMENTS_PATH + filenameToUpload
        const resp = await items.addItem({ title: randomTitle, filePath: filePathToUpload })
        const newItemId = items.getItemByTitle(randomTitle, resp)
        const createdItem = { title: randomTitle, fileName: filenameToUpload, id: newItemId }

        addLog('Created item with data: ' + JSON.stringify(createdItem))
        return createdItem
    }
}