/**
 * @author drodriguez
 * @date 08-31-2025
*/

import { addLog } from "../commands"
import request from "supertest"
import path from "path"
import apiAssertions from "../assertions/api_assertions"

const BASE_URL = "http://immense-hollows-74271.herokuapp.com/api"
const ENDPOINT = "/items"


export default new class ItemsEndpoint {

    async getItems() {
        addLog('Getting items from API')
        const res = await request(BASE_URL)
            .get(ENDPOINT)

        apiAssertions.toHaveStatus(res, 200)
        return res.body
    }

    async addItem({ title, filePath, expectedResponseCode = 200 }: { title: string, filePath: string, expectedResponseCode?: number }) {
        addLog(`Adding item ${title} with file ${filePath} using API`)
        let res
        try {
            res = await request(BASE_URL)
                .post(ENDPOINT)
                .attach("file", path.resolve(process.cwd(), filePath))
                .field("item[text]", title)

            apiAssertions.toHaveStatus(res, expectedResponseCode)
        } catch (e) {
            addLog('Error adding item via API:')
            addLog(JSON.stringify(e.matcherResult) || e.message)
            throw new Error('Error adding item via API: ' + (JSON.stringify(e.matcherResult) || e.message))
        }

        return res.body
    }

    getItemByTitle(title: string, response: Array<any>) {
        return response.find(item => item.text === title).id
    }
}