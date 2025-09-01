import { Response } from "supertest"
import { addLog } from '../commands'

class ApiAssertion {
    toHaveStatus(res: Response, expectedStatus: number) {
        expect(res.status).toBe(expectedStatus)
        addLog(`Assertion >> expected status ${expectedStatus}, got ${res.status}`)
    }

}
export default new ApiAssertion()